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
