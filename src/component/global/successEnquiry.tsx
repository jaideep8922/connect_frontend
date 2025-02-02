import { ShoppingBag } from 'lucide-react';

export default function SuccessMessage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#FFEFD3] p-4 z-40 mx-1">
      <div className="w-full max-w-md mx-4 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ">
          <ShoppingBag className="h-96 w-[800px] text-[#6D2323]" />
        </div>
        <h1 className="mb-2 text-xl font-semibold text-gray-900">
          Your enquiry was successful!
        </h1>
        <p className="text-sm text-gray-500">
          You will get a response within a few minutes.
        </p>
      </div>
    </div>
  );
}
