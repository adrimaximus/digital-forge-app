
// Simple utility to track and store visit counts in localStorage

interface VisitCounts {
  total: number;
  today: string; // Format: "YYYY-MM-DD|count"
  weekly: Record<string, number>; // Format: "YYYY-MM-DD": count
  monthly: Record<string, number>; // Format: "YYYY-MM": count
}

// Initialize or get visit counts from localStorage
const getVisitCounts = (): VisitCounts => {
  const storedCounts = localStorage.getItem('visitCounts');
  if (storedCounts) {
    return JSON.parse(storedCounts);
  }
  
  // Initialize with default values
  return {
    total: 0,
    today: `${getCurrentDateString()}|0`,
    weekly: {},
    monthly: {}
  };
};

// Get current date in YYYY-MM-DD format
const getCurrentDateString = (): string => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

// Get current month in YYYY-MM format
const getCurrentMonthString = (): string => {
  return getCurrentDateString().substring(0, 7);
};

// Record a new visit
export const recordVisit = (): void => {
  const counts = getVisitCounts();
  const currentDate = getCurrentDateString();
  const currentMonth = getCurrentMonthString();
  
  // Update total count
  counts.total += 1;
  
  // Update today's count
  const [storedDate, todayCountStr] = counts.today.split('|');
  if (storedDate === currentDate) {
    counts.today = `${currentDate}|${parseInt(todayCountStr) + 1}`;
  } else {
    counts.today = `${currentDate}|1`;
  }
  
  // Update weekly counts (last 7 days)
  if (!counts.weekly[currentDate]) {
    counts.weekly[currentDate] = 0;
  }
  counts.weekly[currentDate] += 1;
  
  // Clean up weekly data older than 7 days
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneWeekAgoString = oneWeekAgo.toISOString().split('T')[0];
  
  Object.keys(counts.weekly).forEach(date => {
    if (date < oneWeekAgoString) {
      delete counts.weekly[date];
    }
  });
  
  // Update monthly counts
  if (!counts.monthly[currentMonth]) {
    counts.monthly[currentMonth] = 0;
  }
  counts.monthly[currentMonth] += 1;
  
  // Store updated counts
  localStorage.setItem('visitCounts', JSON.stringify(counts));
};

// Get current visit stats
export const getVisitStats = (): { 
  totalViews: number; 
  todayViews: number; 
  weeklyViews: number; 
  monthlyViews: number; 
} => {
  const counts = getVisitCounts();
  const currentDate = getCurrentDateString();
  const currentMonth = getCurrentMonthString();
  
  // Calculate today's views
  const [storedDate, todayCountStr] = counts.today.split('|');
  const todayViews = storedDate === currentDate ? parseInt(todayCountStr) : 0;
  
  // Calculate weekly views (sum of last 7 days)
  let weeklyViews = 0;
  Object.values(counts.weekly).forEach(count => {
    weeklyViews += count;
  });
  
  // Calculate monthly views
  const monthlyViews = counts.monthly[currentMonth] || 0;
  
  return {
    totalViews: counts.total,
    todayViews,
    weeklyViews,
    monthlyViews
  };
};
