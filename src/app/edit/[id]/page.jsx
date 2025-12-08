import DashboardLayout from '../../_components/DashboardLayout';
import JobForm from '../../_components/JobForm';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/db';
import { jobModel } from '@/model/Job';

const EditJobPage = async ({ params }) => {
  const session = await getSession();
  if(!session) redirect('/login');

  const { id } = await params;
  await connectToDatabase();
  const job = await jobModel.findOne({ _id: id, userId: session.id }).lean();

  if (!job) {
    return (
        <DashboardLayout>
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-500">Job not found</h2>
                <p className="text-muted-foreground">The job you are looking for does not exist or you do not have permission to view it.</p>
            </div>
        </DashboardLayout>
    );
  }

  // Serialize mongo object to standard JS object
  const serializedJob = { 
      ...job, 
      _id: job._id.toString(), 
      userId: job.userId.toString(), 
      createdAt: job.createdAt?.toISOString(), 
      updatedAt: job.updatedAt?.toISOString(),
      applicationDate: job.applicationDate ? job.applicationDate.toISOString() : undefined
  };

  return (
    <DashboardLayout>
         <div className="max-w-4xl mx-auto">
            <JobForm initialData={serializedJob} isEdit={true} />
        </div>
    </DashboardLayout>
  )
}

export default EditJobPage;
