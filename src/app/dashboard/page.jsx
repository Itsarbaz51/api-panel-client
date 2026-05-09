// src/app/dashboard/page.jsx

import React from 'react';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  TrendingUp,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const stats = [
  {
    title: "Total Students",
    value: "12,405",
    change: "+12.5%",
    isUp: true,
    icon: Users,
    color: "bg-emerald-500",
  },
  {
    title: "Active Courses",
    value: "456",
    change: "+3.2%",
    isUp: true,
    icon: BookOpen,
    color: "bg-blue-500",
  },
  {
    title: "Total Instructors",
    value: "89",
    change: "-1.5%",
    isUp: false,
    icon: GraduationCap,
    color: "bg-purple-500",
  },
  {
    title: "Revenue",
    value: "$45,200",
    change: "+24.8%",
    isUp: true,
    icon: TrendingUp,
    color: "bg-orange-500",
  },
];

const recentStudents = [
  { name: "Amir Khan", course: "Web Development", date: "2 mins ago", status: "Active" },
  { name: "Sara Ahmed", course: "UI/UX Design", date: "15 mins ago", status: "Pending" },
  { name: "Rahul Verma", course: "Data Science", date: "1 hour ago", status: "Active" },
  { name: "Zoya Malik", course: "Digital Marketing", date: "3 hours ago", status: "Active" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl ${stat.color} text-white shadow-lg`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change}
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area (Graph Placeholder) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Learning Analytics</h3>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={20} /></button>
          </div>
          {/* Placeholder for a Chart */}
          <div className="h-[300px] w-full bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
            <p className="text-gray-400 text-sm italic">Analytics Chart Will Appear Here</p>
          </div>
        </div>

        {/* Sidebar Activity Area */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6">Recent Enrollments</h3>
          <div className="space-y-6">
            {recentStudents.map((student, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-medium">{student.date}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${student.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                    {student.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
            View All Students
          </button>
        </div>
      </div>
    </div>
  );
}