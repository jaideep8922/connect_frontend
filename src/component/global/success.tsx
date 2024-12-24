import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function VerificationSuccess() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center">
        {/* Outer rings */}
        <div className="absolute h-24 w-24 animate-ping rounded-full bg-blue-100 opacity-75" />
        <div className="absolute h-20 w-20 rounded-full bg-blue-200" />
        
        {/* Icon container */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
          <FontAwesomeIcon 
            icon="check" 
            className="h-8 w-8 text-white"
          />
        </div>
      </div>

      <h1 className="mt-8 text-xl font-semibold text-gray-900">
        Successfully
      </h1>
      
      <p className="mt-2 text-center text-sm text-gray-600">
        Your mobile number is successfully verified.
      </p>
    </div>
  )
}

