'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { approveListing, deleteListing, rejectListing } from '../actions'


interface ListingItemProps {
    listing: {
        id: string
        title: string
        status: string
        createdAt: string
    }
}

export function ListingItem({ listing }: ListingItemProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleAction = async (action: 'approve' | 'reject' | 'delete') => {
        setIsLoading(true)
        try {
            switch (action) {
                case 'approve':
                    await approveListing(listing.id)
                    break
                case 'reject':
                    await rejectListing(listing.id)
                    break
                case 'delete':
                    await deleteListing(listing.id)
                    break
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
                <h2 className="text-lg font-semibold">{listing.title}</h2>
                <p className="text-sm text-gray-500">Status: {listing.status}</p>
                <p className="text-sm text-gray-500">Created: {listing.createdAt}</p>
            </div>
            <div className="space-x-2">
                {listing.status === 'pending' && (
                    <>
                        <Button onClick={() => handleAction('approve')} disabled={isLoading}>Approve</Button>
                        <Button onClick={() => handleAction('reject')} variant="destructive" disabled={isLoading}>Reject</Button>
                    </>
                )}
                <Button onClick={() => handleAction('delete')} variant="outline" disabled={isLoading}>Delete</Button>
                <Button onClick={() => {/* Open edit modal */ }} variant="outline" disabled={isLoading}>Edit</Button>
                <Button onClick={() => {/* Open details modal */ }} variant="outline" disabled={isLoading}>View Details</Button>
            </div>
        </div>
    )
}

