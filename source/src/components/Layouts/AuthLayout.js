export default function AuthLayout({ children }) {
  return (
    <div className="grow flex flex-col sm:justify-center items-center pt-6 sm:pt-0 pb-32 bg-gray-100">
      {children}
    </div>
  )
}
