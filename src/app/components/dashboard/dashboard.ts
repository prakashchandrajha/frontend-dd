import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Layout } from '../layout/layout';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,Layout],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
   stats = [
    {
      title: 'Total Revenue',
      value: '$48,294',
      change: '+12.5%',
      trend: 'up',
      icon: 'revenue',
      color: 'indigo'
    },
    {
      title: 'Active Users',
      value: '2,420',
      change: '+8.2%',
      trend: 'up',
      icon: 'users',
      color: 'purple'
    },
    {
      title: 'Pending Tasks',
      value: '38',
      change: '-2.4%',
      trend: 'down',
      icon: 'tasks',
      color: 'cyan'
    },
    {
      title: 'Avg. Rating',
      value: '4.8',
      change: '+4.1%',
      trend: 'up',
      icon: 'rating',
      color: 'amber'
    }
  ];

  chartBars = [45, 62, 55, 78, 85, 72, 90, 65, 88, 92, 75, 82];
  chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  recentActivity = [
    {
      user: 'Sarah Chen',
      action: 'completed task',
      target: 'Website Redesign',
      time: '2 min ago',
      avatar: 'SC',
      color: 'bg-emerald-500'
    },
    {
      user: 'Mike Ross',
      action: 'commented on',
      target: 'API Integration',
      time: '15 min ago',
      avatar: 'MR',
      color: 'bg-blue-500'
    },
    {
      user: 'Emma Wilson',
      action: 'uploaded file to',
      target: 'Design Assets',
      time: '1 hour ago',
      avatar: 'EW',
      color: 'bg-purple-500'
    },
    {
      user: 'James Lee',
      action: 'created project',
      target: 'Mobile App v2',
      time: '3 hours ago',
      avatar: 'JL',
      color: 'bg-orange-500'
    }
  ];

  projects = [
    {
      name: 'E-Commerce Platform',
      description: 'Modern shopping experience',
      status: 'In Progress',
      progress: 75,
      members: 4,
      dueDate: 'Dec 24',
      color: 'indigo'
    },
    {
      name: 'Mobile Banking App',
      description: 'Secure financial management',
      status: 'Review',
      progress: 90,
      members: 3,
      dueDate: 'Dec 20',
      color: 'emerald'
    },
    {
      name: 'AI Analytics Dashboard',
      description: 'Data visualization platform',
      status: 'In Progress',
      progress: 45,
      members: 5,
      dueDate: 'Jan 15',
      color: 'purple'
    },
    {
      name: 'Cloud Migration',
      description: 'Infrastructure upgrade',
      status: 'Planning',
      progress: 20,
      members: 2,
      dueDate: 'Feb 01',
      color: 'amber'
    }
  ];

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'In Progress': 'blue',
      'Review': 'amber',
      'Planning': 'slate',
      'Completed': 'emerald'
    };
    return colors[status] || 'slate';
  }

}
