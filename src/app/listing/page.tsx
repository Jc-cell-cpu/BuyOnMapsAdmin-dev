import { Suspense } from 'react'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import { ListingItem } from './(component)/listing-items'
import { ListingDetailsModal } from './(component)/listing-details-modal'
import { EditListingForm } from './(component)/edit-listing-form'

// This would typically come from your database
const getListings = async () => {
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [
        { id: '1', title: 'Cozy Apartment', status: 'pending', createdAt: '2023-01-01' },
        { id: '2', title: 'Luxury Villa', status: 'approved', createdAt: '2023-01-02' },
        { id: '3', title: 'City Studio', status: 'rejected', createdAt: '2023-01-03' },
    ]
}


export default async function Listing() {
    const listings = await getListings()

    return (
        <DefaultLayout>
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Admin Listings</h1>
                <div className="space-y-4">
                    {listings.map((listing) => (
                        <Suspense key={listing.id} fallback={<div>Loading...</div>}>
                            <ListingItem listing={listing} />
                        </Suspense>
                    ))}
                </div>
                <ListingDetailsModal />
                <EditListingForm />
            </div>
        </DefaultLayout>

    )
}