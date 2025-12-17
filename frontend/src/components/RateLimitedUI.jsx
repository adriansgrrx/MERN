import React from 'react'
import { ZapIcon } from 'lucide-react'

const RateLimitedUI = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8 font-mono">
            <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row items-center gap-6 p-6">
                <div className="flex items-center justify-center bg-primary/20 p-4 rounded-full">
                    <ZapIcon className="size-10 text-primary" />
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-semibold mb-2">
                    Too Many Requests
                    </h3>
                    <p className="text-base-content mb-1">
                    The system has detected a high number of requests in a short time.
                    </p>
                    <p className="text-sm text-base-content/70">
                    Please pause briefly and try again to continue smoothly.
                    </p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default RateLimitedUI