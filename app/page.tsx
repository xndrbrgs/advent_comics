import AvatarPreview from "@/components/avatar/AvatarPreview";
import FeatureSelector from "@/components/avatar/FeatureSelector";
import StartStoryButton from "@/components/ui/StartStory";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#e4f3ff]">
      <section className="flex items-center justify-center h-screen">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 border py-12 pl-12 bg-white rounded-2xl shadow-xl h-[65vh]">
          {/* Avatar Customization */}
          <div>
            <FeatureSelector />
          </div>
          {/* Avatar Preview */}
          <div className="bg-white flex flex-col items-center justify-center space-y-6 border rounded-xl shadow-xl rotate-[-5deg]">
            <AvatarPreview />
            <StartStoryButton />
          </div>
        </div>
      </section>
    </main>
  );
}
