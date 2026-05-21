// lib/mock-data.ts
export const dashboardData = {
  stats: {
    activeShipments: 1245,
    monthlyRevenue: 45200,
    pendingBookings: 34,
    deliverySuccessRate: 98.5
  },
  shipmentVolume: Array.from({length: 30}, (_, i) => ({
    date: `Day ${i + 1}`,
    shipments: 800 + Math.floor(Math.random() * 600)
  })),
  statusDistribution: [
    { name: 'In Transit', value: 45 },
    { name: 'Delivered', value: 35 },
    { name: 'Pending', value: 12 },
    { name: 'Cancelled', value: 8 }
  ],
  recentActivity: [
    { id: 'TRK-1001', vendor: 'FastExpress', route: 'NY → LA', status: 'in_transit', date: '2023-10-24', amount: 1250 },
    { id: 'TRK-1002', vendor: 'GlobalTransit', route: 'CHI → MIA', status: 'delivered', date: '2023-10-23', amount: 850 },
    { id: 'TRK-1003', vendor: 'CityDash', route: 'SEA → SF', status: 'pending', date: '2023-10-24', amount: 420 },
    { id: 'TRK-1004', vendor: 'PrimeLogistics', route: 'DAL → HOU', status: 'delayed', date: '2023-10-22', amount: 310 },
    { id: 'TRK-1005', vendor: 'SwiftShip', route: 'BOS → PHL', status: 'cancelled', date: '2023-10-21', amount: 150 },
    { id: 'TRK-1006', vendor: 'ApexFreight', route: 'MIA → ATL', status: 'overdue', date: '2023-10-20', amount: 680 }
  ]
};

export const analyticsData = {
  kpis: {
    revenue: 124500,
    bookings: 1432,
    vendors: 84,
    avgDeliveryTime: 2.4,
    onTimeRate: 96.8
  },
  revenueTrend: Array.from({length: 30}, (_, i) => ({
    date: `Day ${i + 1}`,
    revenue: 3000 + Math.floor(Math.random() * 3000),
    bookings: 30 + Math.floor(Math.random() * 50)
  })),
  statusBreakdown: [
    { name: 'In Transit', value: 542 },
    { name: 'Delivered', value: 418 },
    { name: 'Pending', value: 145 },
    { name: 'Delayed', value: 67 },
    { name: 'Cancelled', value: 28 }
  ],
  topRoutes: [
    { route: 'NY → LA', count: 420 },
    { route: 'CHI → MIA', count: 315 },
    { route: 'SEA → SF', count: 280 },
    { route: 'DAL → HOU', count: 190 },
    { route: 'BOS → PHL', count: 110 }
  ],
  vendorPerformance: [
    { metric: 'On-Time%', FastExpress: 98, GlobalTransit: 95, CityDash: 92 },
    { metric: 'Volume', FastExpress: 85, GlobalTransit: 75, CityDash: 60 },
    { metric: 'Revenue', FastExpress: 90, GlobalTransit: 80, CityDash: 65 },
    { metric: 'Satisfaction', FastExpress: 95, GlobalTransit: 90, CityDash: 85 },
    { metric: 'Speed', FastExpress: 92, GlobalTransit: 88, CityDash: 90 }
  ],
  dailySuccess: Array.from({length: 30}, (_, i) => ({
    date: `Day ${i + 1}`,
    actual: 92 + Math.random() * 7,
    target: 95
  })),
  vendors: [
    { name: 'FastExpress', shipments: 420, revenue: 52000, onTime: 98, avgValue: 123, trend: [10, 15, 12, 18, 20, 22, 25], status: 'active' },
    { name: 'GlobalTransit', shipments: 315, revenue: 38000, onTime: 95, avgValue: 120, trend: [20, 18, 22, 21, 24, 23, 26], status: 'active' },
    { name: 'CityDash', shipments: 280, revenue: 25000, onTime: 92, avgValue: 89, trend: [15, 14, 16, 15, 18, 17, 19], status: 'active' },
    { name: 'PrimeLogistics', shipments: 190, revenue: 18000, onTime: 88, avgValue: 94, trend: [12, 11, 13, 14, 15, 16, 15], status: 'active' },
    { name: 'SwiftShip', shipments: 110, revenue: 9000, onTime: 82, avgValue: 81, trend: [8, 9, 7, 10, 11, 9, 12], status: 'inactive' },
    { name: 'ApexFreight', shipments: 80, revenue: 6000, onTime: 90, avgValue: 75, trend: [5, 6, 8, 7, 9, 10, 8], status: 'active' },
    { name: 'StarLogistics', shipments: 60, revenue: 5000, onTime: 96, avgValue: 83, trend: [4, 5, 4, 6, 5, 7, 6], status: 'active' },
    { name: 'OceanicTransit', shipments: 40, revenue: 3000, onTime: 85, avgValue: 75, trend: [2, 3, 4, 3, 5, 4, 5], status: 'inactive' }
  ]
};

export const shipmentsData = {
  stats: {
    active: 1245,
    inTransit: 542,
    delivered: 418
  },
  list: Array.from({length: 48}, (_, i) => ({
    id: `TRK-20${i.toString().padStart(2, '0')}`,
    vendor: ['FastExpress', 'GlobalTransit', 'CityDash'][i % 3],
    route: ['NY → LA', 'CHI → MIA', 'SEA → SF'][i % 3],
    status: ['in_transit', 'delivered', 'pending', 'delayed', 'cancelled', 'overdue'][i % 6],
    eta: `2023-11-${(i % 30 + 1).toString().padStart(2, '0')}`,
    weight: `${100 + i * 10} lbs`,
    amount: 500 + i * 20
  }))
};

export const bookingsData = {
  stats: {
    total: 1248,
    pending: 42,
    thisMonth: 186
  },
  list: Array.from({length: 48}, (_, i) => ({
    id: `BKG-30${i.toString().padStart(2, '0')}`,
    date: `2023-10-${(i % 30 + 1).toString().padStart(2, '0')}`,
    vendor: ['FastExpress', 'GlobalTransit', 'CityDash'][i % 3],
    route: ['NY → LA', 'CHI → MIA', 'SEA → SF'][i % 3],
    status: ['pending', 'confirmed', 'cancelled'][i % 3],
    amount: 800 + i * 15
  }))
};

export const paymentsData = {
  stats: {
    totalPaid: 1240000,
    pending: 450000,
    overdue: 84200,
    failed: 4100
  },
  invoices: Array.from({length: 24}, (_, i) => ({
    id: `INV-40${i.toString().padStart(2, '0')}`,
    vendor: ['FastExpress', 'GlobalTransit', 'CityDash'][i % 3],
    amount: 2500 + i * 100,
    dueDate: `2023-11-${(i % 30 + 1).toString().padStart(2, '0')}`,
    status: ['paid', 'pending', 'overdue', 'failed'][i % 4]
  }))
};

export const supportData = {
  stats: {
    open: 8,
    inProgress: 3,
    resolved: 24
  },
  tickets: Array.from({length: 12}, (_, i) => ({
    id: `TCK-50${i.toString().padStart(2, '0')}`,
    subject: ['Login Issue', 'Billing Question', 'Shipment Delayed', 'API Error'][i % 4],
    priority: ['Critical', 'High', 'Medium', 'Low'][i % 4],
    status: ['Open', 'In Progress', 'Resolved', 'Closed'][i % 4],
    created: `2023-10-${(i % 30 + 1).toString().padStart(2, '0')}`,
    lastUpdate: `${i % 24 + 1} hours ago`
  }))
};
