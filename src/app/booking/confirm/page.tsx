import { query } from '@/lib/db';
import { calculateFare } from '@/lib/pricing';
import ConfirmBookingClient from './ConfirmBookingClient';

export const revalidate = 0;

interface ConfirmBookingPageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function ConfirmBookingPage({ searchParams }: ConfirmBookingPageProps) {
  const vehicleTypeId = searchParams.vehicleTypeId;
  const serviceType = (searchParams.serviceType as any) || 'ONE_WAY';
  const rentalPackageId = searchParams.rentalPackageId;

  let vehicleType = null;
  if (vehicleTypeId) {
    const res = await query(`SELECT * FROM "VehicleType" WHERE id = $1`, [vehicleTypeId]);
    if (res.rows.length > 0) vehicleType = res.rows[0];
  }

  const fareBreakdown = await calculateFare({
    vehicleTypeId: vehicleTypeId || undefined,
    serviceType,
    estimatedKm: serviceType === 'ROUND_TRIP' ? 180 : 120,
    rentalPackageId: rentalPackageId || undefined
  });

  return (
    <ConfirmBookingClient
      searchParams={searchParams}
      vehicleType={vehicleType}
      fareBreakdown={fareBreakdown}
    />
  );
}
