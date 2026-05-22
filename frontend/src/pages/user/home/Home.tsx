import {
  Plane,
  FileUp,
  Sparkles,
  Share2,
  History,
  Map,
} from "lucide-react";

const Home = () => {
  return (
    <div className="bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50">
        <div className="container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 mb-6">
              <Plane size={16} />
              AI Powered Travel Planning
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Plan Smarter Trips with{" "}
              <span className="text-sky-600">
                Trip Pilot AI
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Upload your flight tickets,
              hotel bookings, or travel
              documents and let AI
              automatically generate a
              personalized travel itinerary
              in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-xl font-semibold transition">
                Get Started
              </button>

              <button className="border border-slate-300 hover:bg-slate-100 px-8 py-4 rounded-xl font-semibold transition">
                Explore Features
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              How It Works
            </h2>

            <p className="text-slate-600 text-lg">
              Generate travel itineraries in
              just a few steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center mb-5">
                <FileUp className="text-sky-600" />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Upload Bookings
              </h3>

              <p className="text-slate-600">
                Upload flight tickets,
                hotel reservations, PDFs,
                or travel booking images.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center mb-5">
                <Sparkles className="text-cyan-600" />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                AI Extracts Details
              </h3>

              <p className="text-slate-600">
                Our AI understands your
                travel documents and
                extracts important trip
                details automatically.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-5">
                <Map className="text-emerald-600" />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Get Smart Itinerary
              </h3>

              <p className="text-slate-600">
                Receive a beautifully
                structured AI-powered
                travel itinerary tailored
                to your bookings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">
              Why Trip Pilot AI?
            </h2>

            <p className="text-slate-600 text-lg">
              Smart features designed for
              effortless travel planning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <History className="mb-4 text-sky-600" />

              <h3 className="font-semibold text-xl mb-3">
                Travel History
              </h3>

              <p className="text-slate-600">
                Access previously generated
                itineraries anytime.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <Share2 className="mb-4 text-sky-600" />

              <h3 className="font-semibold text-xl mb-3">
                Share Trips
              </h3>

              <p className="text-slate-600">
                Easily share your itinerary
                with friends and travel
                companions.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <Sparkles className="mb-4 text-sky-600" />

              <h3 className="font-semibold text-xl mb-3">
                AI Powered
              </h3>

              <p className="text-slate-600">
                Intelligent itinerary
                generation powered by AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-sky-600 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">
            Ready for Your Next Adventure?
          </h2>

          <p className="text-lg text-sky-100 mb-8">
            Upload your bookings and let
            Trip Pilot AI create your
            perfect itinerary.
          </p>

          <button className="bg-white text-sky-700 hover:bg-slate-100 px-8 py-4 rounded-xl font-semibold transition">
            Start Planning
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;