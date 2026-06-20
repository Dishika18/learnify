import React from 'react';
import { createClient } from '@/lib/supabase';
import { CourseTile } from './tiles/CourseTile';
import { Card } from './ui/Card';
import { BookOpen } from 'lucide-react';
import { Course } from '@/types';

export default async function CourseList() {
  const supabase = await createClient();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error('User not authenticated.');
  }

  const { data: courses, error } = await supabase
    .from('courses')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-2 flex justify-center items-center h-full min-h-[180px]">
        <Card className="w-full flex flex-col items-center justify-center p-8 text-center min-h-[180px]">
          <div className="text-text-muted bg-white/5 p-3 rounded-full mb-3 shrink-0">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-text-primary mb-1">No courses yet</h3>
          <p className="text-sm text-text-secondary max-w-[240px]">
            Courses you enroll in will appear here.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <>
      {courses.map((course, index) => (
        <CourseTile key={course.id} course={course as unknown as Course} index={index} />
      ))}
    </>
  );
}
export { CourseList };
