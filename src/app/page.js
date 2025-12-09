import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/db";
import { jobModel } from "@/model/Job";
import { userModel } from "@/model/User";
import JobCard from "./_components/JobCard";
import StatsOverview from "./_components/StatsOverview";
import DashboardLayout from "./_components/DashboardLayout";
import Link from "next/link";


export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  await connectToDatabase();
  
  const user = await userModel.findById(session.id);
  const applicationGoal = user?.applicationGoal || 50;
  
  const { status, query: searchQuery } = await searchParams; // Assuming we might pass search via URL too
  const dbQuery = { userId: session.id };

  if (status && status !== 'All') {
     // status filtering if needed
  }

  // Simple search integration if passed via URL (requires client component to push to URL)
  if (searchQuery) {
      dbQuery.$or = [
          { company: { $regex: searchQuery, $options: 'i' } },
          { position: { $regex: searchQuery, $options: 'i' } }
      ];
  }

  const allJobs = await jobModel.find(dbQuery).sort({ createdAt: -1 })
  const recentJobs = allJobs.slice(0, 4);

  // Serialization
  const serializedJobs = allJobs.map(job => ({
    ...job.toObject(), 
    _id: job._id.toString(), 
    userId: job.userId.toString(),
    createdAt: job.createdAt?.toISOString(),
    updatedAt: job.updatedAt?.toISOString(),
    applicationDate: (job.applicationDate || job.createdAt)?.toISOString()
  }));

  const serializedRecentJobs = recentJobs.map(job => ({
    ...job.toObject(), 
    _id: job._id.toString(), 
    userId: job.userId.toString(),
    createdAt: job.createdAt?.toISOString(),
    updatedAt: job.updatedAt?.toISOString(),
    applicationDate: (job.applicationDate || job.createdAt)?.toISOString()
  }));

  

  return (
    <DashboardLayout applicationGoal={applicationGoal}>
        {/* Stats */}
        <StatsOverview jobs={serializedJobs} goal={applicationGoal} />

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold tracking-tight">Recent Applications</h2>
                    <Link href="/applications" className="text-sm text-primary hover:underline font-medium">View All</Link>
                </div>
                <div className="flex gap-2">
                {/* Filter Tabs could go here */}
                    <Link 
                        href="/create"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm transition-all flex items-center shadow-lg shadow-primary/25"
                    >
                        <span className="mr-2 text-lg">+</span> New Task
                    </Link>
                </div>
        </div>

        {serializedRecentJobs.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-xl border border-dashed border-border animate-in fade-in zoom-in-95 duration-300">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-2">Ready for takeoff?</h3>
                <p className="text-muted-foreground mb-6">
                    Start tracking your first job application.
                </p>
                <Link 
                    href="/create"
                    className="text-primary font-medium hover:underline"
                >
                    Track now &rarr;
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {serializedRecentJobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>
        )}
    </DashboardLayout>
  );
}