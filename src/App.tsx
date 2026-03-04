import logo from "../public/assets/images/logo-large.svg"
import './App.css'
import star from "../public/assets/images/icon-menu.svg"


interface StatCardProps {
  label?: string;
  value?: string | number;
  icon: string;
  color: string;
}

const statsIcons = [
  {
    icon: star,
    label: "Total Cards",
    color: "bg-blue-500",
    value: "24"
  },
  {
    icon: star,
    color: "bg-green-500",
    label: "Mastered",
    value: "11"
  },
  {
    icon: star,
    color: "bg-red-500",
    label: "In Progress",
    value: "21"
  },
  {
    icon: star,
    color: "bg-yellow-500",
    label: "Not Started",
    value: "8"
  },
]

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        <div className="flex gap-2">
          <button className="btn-primary">Study Mode</button>
          <button className="btn-secondary">All Cards</button>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Header */}


        {/* Main Study Card */}
        <section className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          {/* Controls */}
          <div className="flex justify-between gap-3 mb-6">
            <div className="flex gap-2">
              <button className="btn-secondary">All Categories</button>
              <button className="btn-secondary">Hide Mastered</button>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary">Shuffle</button>
            </div>
          </div>

          {/* Flashcard Display */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-10 text-center shadow-sm mb-6">
            <p className="text-lg text-gray-700">
              Your flashcard question will appear here.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex w-full gap-2 justify-center items-center">
              <button className="btn-success">I Know This</button>
              <button className="btn-danger">Reset</button>
            </div>
          </div>

          <div className="flex w-full justify-between items-center mt-6">
            <button className="btn-secondary">Previous</button>
            <button className="btn-primary">Next</button>
          </div>
        </section>


        {/* Study Statistics Card */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-black">
            Study Statistics
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {statsIcons.map((stat, index) => (
              <StatCard
                key={index}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

/* Reusable Stat Card */
function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-gray-50 flex justify-between border border-gray-200 rounded-xl text-center">
      <div className="flex justify-center flex-col items-start p-2">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`flex ${color} items-center`}>
        <img src={icon} alt="icon" className="w-6 h-6" />
      </div>
    </div>
  );
}

export default App