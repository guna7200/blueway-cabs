import { query } from '@/lib/db';

export interface VehicleTypePricing {
  id: string;
  name: string;
  slug: string;
  baseFare: number;
  perKmRate: number;
  minimumKm: number;
  driverBata: number;
  nightCharge: number;
  extraHourRate: number;
  airportCharge: number;
}

export interface FareCalculationInput {
  vehicleTypeId?: string;
  serviceType: 'ONE_WAY' | 'ROUND_TRIP' | 'AIRPORT_TRANSFER' | 'LOCAL_RENTAL' | 'ACTING_DRIVER';
  estimatedKm?: number;
  durationHours?: number;
  isNight?: boolean;
  rentalPackageId?: string;
  discountAmount?: number;
}

export interface FareBreakdown {
  baseFare: number;
  estimatedKm: number;
  ratePerKm: number;
  kmCharge: number;
  driverBata: number;
  nightCharge: number;
  extraHrCharge: number;
  airportCharge: number;
  tollEstimate: number;
  parkingEstimate: number;
  discount: number;
  totalFare: number;
}

export async function calculateFare(input: FareCalculationInput): Promise<FareBreakdown> {
  const {
    vehicleTypeId,
    serviceType,
    estimatedKm = 50,
    durationHours = 0,
    isNight = false,
    rentalPackageId,
    discountAmount = 0
  } = input;

  let baseFare = 500;
  let ratePerKm = 14;
  let minimumKm = 10;
  let driverBata = 300;
  let nightCharge = 0;
  let extraHrCharge = 0;
  let airportCharge = 0;
  let tollEstimate = 150;
  let parkingEstimate = 50;

  if (serviceType === 'ACTING_DRIVER') {
    // Pricing for hiring a professional driver for customer's own car
    const hourlyRate = 120;
    const baseHours = Math.max(durationHours, 4);
    const totalDriverFare = baseHours * hourlyRate + (isNight ? 200 : 0);
    return {
      baseFare: totalDriverFare,
      estimatedKm: 0,
      ratePerKm: 0,
      kmCharge: 0,
      driverBata: 0,
      nightCharge: isNight ? 200 : 0,
      extraHrCharge: 0,
      airportCharge: 0,
      tollEstimate: 0,
      parkingEstimate: 0,
      discount: discountAmount,
      totalFare: Math.max(0, totalDriverFare - discountAmount)
    };
  }

  if (serviceType === 'LOCAL_RENTAL' && rentalPackageId) {
    const pkgRes = await query(`SELECT * FROM "RentalPackage" WHERE id = $1`, [rentalPackageId]);
    if (pkgRes.rows.length > 0) {
      const pkg = pkgRes.rows[0];
      const pkgBase = Number(pkg.basePrice) || 1200;
      const extraKm = Math.max(0, estimatedKm - pkg.includedKm);
      const extraKmCharge = extraKm * Number(pkg.extraKmRate || 15);
      const extraHrs = Math.max(0, durationHours - pkg.hours);
      const extraHrsCharge = extraHrs * Number(pkg.extraHrRate || 150);
      const night = isNight ? 200 : 0;
      const total = pkgBase + extraKmCharge + extraHrsCharge + night - discountAmount;
      return {
        baseFare: pkgBase,
        estimatedKm,
        ratePerKm: Number(pkg.extraKmRate || 15),
        kmCharge: extraKmCharge,
        driverBata: 300,
        nightCharge: night,
        extraHrCharge: extraHrsCharge,
        airportCharge: 0,
        tollEstimate: 0,
        parkingEstimate: 0,
        discount: discountAmount,
        totalFare: Math.max(0, total)
      };
    }
  }

  if (vehicleTypeId) {
    const vtRes = await query(`SELECT * FROM "VehicleType" WHERE id = $1`, [vehicleTypeId]);
    if (vtRes.rows.length > 0) {
      const vt = vtRes.rows[0];
      baseFare = Number(vt.baseFare) || 500;
      ratePerKm = Number(vt.perKmRate) || 14;
      minimumKm = Number(vt.minimumKm) || 10;
      driverBata = Number(vt.driverBata) || 300;
      if (isNight) nightCharge = Number(vt.nightCharge) || 200;
      if (serviceType === 'AIRPORT_TRANSFER') airportCharge = Number(vt.airportCharge) || 200;
    }
  }

  const billableKm = Math.max(estimatedKm, minimumKm);
  const kmCharge = billableKm * ratePerKm;

  if (serviceType === 'ROUND_TRIP') {
    // Round trip pricing multiplier for return distance + 2x driver bata
    driverBata *= 2;
  }

  const subtotal = baseFare + kmCharge + driverBata + nightCharge + extraHrCharge + airportCharge + tollEstimate + parkingEstimate;
  const totalFare = Math.max(0, subtotal - discountAmount);

  return {
    baseFare,
    estimatedKm: billableKm,
    ratePerKm,
    kmCharge,
    driverBata,
    nightCharge,
    extraHrCharge,
    airportCharge,
    tollEstimate,
    parkingEstimate,
    discount: discountAmount,
    totalFare
  };
}
