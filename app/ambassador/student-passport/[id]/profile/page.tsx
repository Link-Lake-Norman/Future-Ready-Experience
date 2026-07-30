import Link from "next/link";
import { notFound } from "next/navigation";
import { students } from "@/content/platform";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StudentProfilePage({
  params,
}: PageProps) {
  const { id } = await params;

  const student = students.find(
    (item) => item.id === id
  );

  if (!student) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <header className="rounded-3xl bg-[#0D1B3D] p-10 text-white">
        <Link
          href={`/ambassador/student-passport/${student.id}`}
          className="font-bold text-[#F2B705]"
        >
          ← Back to Student Passport
        </Link>

        <h1 className="mt-7 text-4xl font-black">
          My Future Ready™ Profile
        </h1>

        <p className="mt-3 text-lg text-slate-200">
          {student.name}
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <ProfileField
          title="About Me"
          placeholder="Tell your story..."
        />

        <ProfileField
          title="My Strengths"
          placeholder="Leadership, creativity, teamwork..."
        />

        <ProfileField
          title="Career Interests"
          placeholder="Careers and industries you want to explore..."
        />

        <ProfileField
          title="Future Goals"
          placeholder="Where do you want to go?"
        />

        <button
          type="button"
          className="mt-8 rounded-xl bg-[#F2B705] px-7 py-4 font-black text-[#0D1B3D]"
        >
          Save Profile
        </button>
      </section>
    </div>
  );
}

function ProfileField({
  title,
  placeholder,
}: {
  title: string;
  placeholder: string;
}) {
  return (
    <label className="mb-8 block">
      <span className="text-2xl font-black text-[#0D1B3D]">
        {title}
      </span>

      <textarea
        placeholder={placeholder}
        className="mt-4 min-h-32 w-full rounded-2xl border border-slate-300 p-5"
      />
    </label>
  );
}
