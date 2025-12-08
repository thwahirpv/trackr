
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/db";
import { jobModel } from "@/model/Job";
import JobCard from "../_components/JobCard";
import DashboardLayout from "../_components/DashboardLayout";
import FilterSidebar from "../_components/FilterSidebar";

export const dynamic = 'force-dynamic';

export default async function ApplicationsPage({ searchParams }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  await connectToDatabase();
  
  const { 
      response, 
      priority, 
      applicationMethod, 
      isApplied, 
      isCalled, 
      isMailed,
      query: searchQuery 
  } = await searchParams;

  const dbQuery = { userId: session.id };

  // Apply filters
  if (response && response !== 'All') dbQuery.response = response;
  if (priority && priority !== 'All') dbQuery.priority = priority;
  if (applicationMethod && applicationMethod !== 'All') dbQuery.applicationMethod = applicationMethod;
  if (isApplied && isApplied !== 'All') dbQuery.isApplied = isApplied;
  if (isCalled && isCalled !== 'All') dbQuery.isCalled = isCalled;
  if (isMailed && isMailed !== 'All') dbQuery.isMailed = isMailed;

  // Search
  if (searchQuery) {
      dbQuery.$or = [
          { company: { $regex: searchQuery, $options: 'i' } },
          { position: { $regex: searchQuery, $options: 'i' } }
      ];
  }

  const jobs = await jobModel.find(dbQuery).sort({ createdAt: -1 });

  // Serialization
  const serializedJobs = jobs.map(job => ({
    ...job.toObject(), 
    _id: job._id.toString(), 
    userId: job.userId.toString(),
    createdAt: job.createdAt?.toISOString(),
    updatedAt: job.updatedAt?.toISOString(),
    applicationDate: (job.applicationDate || job.createdAt)?.toISOString()
  }));

  return (
    <DashboardLayout>
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">All Applications</h2>
                <span className="text-sm text-muted-foreground">{serializedJobs.length} found</span>
            </div>

            {/* Top Filter Bar */}
            <FilterSidebar />

            {/* Main Content */}
            <div className="min-h-[500px]">
                {serializedJobs.length === 0 ? (
                    <div className="text-center py-20 bg-card rounded-xl border border-dashed border-border mx-auto max-w-2xl">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-lg font-medium mb-1">No applications found</h3>
                        <p className="text-sm text-muted-foreground">Try adjusting your filters or search query.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {serializedJobs.map((job) => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    </DashboardLayout>
  );
}
