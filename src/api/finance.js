import request from "@/utils/request";
export function getIncomeYears() {
  return request({
    url: "/finance/income/years",
    method: "get",
  });
}

export function getIncomeByYear(year) {
  return request({
    url: "/finance/income/year/" + year,
    method: "get",
  });
}

export function getIncomeById(id) {
  return request({
    url: "/finance/income/id/" + id,
    method: "get",
  });
}

export function getCurrentYearIncomes() {
  return request({
    url: "/finance/income/year",
    method: "get",
  });
}

export function getCurrentMonthIncomes() {
  return request({
    url: "/finance/income/month",
    method: "get",
  });
}

export function getCurrentWeekIncomes() {
  return request({
    url: "/finance/income/week",
    method: "get",
  });
}

export function getCurrentDayIncomes() {
  return request({
    url: "/finance/income/today",
    method: "get",
  });
}

export function getCurrentDailyIncomes() {
  return request({
    url: "/finance/income/today/daily",
    method: "get",
  });
}

export function getCurrentDayDailyIncomeDistribution() {
  return request({
    url: "/finance/income/today/distribution",
    method: "get",
  });
}

export function getCurrentMonthDailyIncomes() {
  return request({
    url: "/finance/income/month/daily",
    method: "get",
  });
}

export function getCurrentWeekDailyIncomes() {
  return request({
    url: "/finance/income/week/daily",
    method: "get",
  });
}

export function getCurrentYearMonthlyIncomes() {
  return request({
    url: "/finance/income/year/monthly",
    method: "get",
  });
}

export function getCurrentYearIncomeDistribution() {
  return request({
    url: "/finance/income/year/distribution",
    method: "get",
  });
}

export function getCurrentMonthIncomeDistribution() {
  return request({
    url: "/finance/income/month/distribution",
    method: "get",
  });
}

export function getCurrentWeekIncomeDistribution() {
  return request({
    url: "/finance/income/week/distribution",
    method: "get",
  });
}

export function getWeeklyComparisonIncomes() {
  return request({
    url: "/finance/income/comp/week",
    method: "get",
  });
}

export function getMonthlyComparisonIncomes() {
  return request({
    url: "/finance/income/comp/month",
    method: "get",
  });
}

export function getYearlyComparisonIncomes() {
  return request({
    url: "/finance/income/comp/year",
    method: "get",
  });
}

export function getYearDistributions(data) {
  return request({
    url: "/finance/income/distribution/year/" + data,
    method: "get",
  });
}

export function getWeekDistributions(data) {
  return request({
    url: "/finance/income/distribution/week/" + data,
    method: "get",
  });
}

// get income distributions between services of all time
export function getAllTimePercentages() {
  return request({
    url: "/finance/income/comp/all_time",
    method: "get",
  });
}

export function getAllTimeServiceCounts() {
  return request({
    url: "/finance/income/comp/all_time_count",
    method: "get",
  });
}

// income records
export function getHighestDailyIncome() {
  return request({
    url: "/finance/income/record/day",
    method: "get",
  });
}

export function getHighestWeeklyIncome() {
  return request({
    url: "/finance/income/record/week",
    method: "get",
  });
}

export function getHighestMonthlyIncome() {
  return request({
    url: "/finance/income/record/month",
    method: "get",
  });
}

export function getHighestYearlyIncome() {
  return request({
    url: "/finance/income/record/year",
    method: "get",
  });
}

export function getHighestSpender() {
  return request({
    url: "/finance/income/record/spender",
    method: "get",
  });
}

export function getAllIncomes() {
  return request({
    url: "/finance/income",
    method: "get",
  });
}

export function getWeeklyIncomes() {
  return request({
    url: "/finance/income/weekly",
    method: "get",
  });
}

export function getMonthlyIncomes() {
  return request({
    url: "/finance/income/monthly",
    method: "get",
  });
}

export function getYearlyIncomes() {
  return request({
    url: "/finance/income/yearly",
    method: "get",
  });
}

export function getPatientIncome(id) {
  return request({
    url: "/finance/income/patient/" + id,
    method: "get",
  });
}

export function addPatientIncome(data) {
  return request({
    url: "/finance/income/patient",
    method: "post",
    data,
  });
}

export function addIncomeType(data) {
  return request({
    url: "/income_type",
    method: "post",
    data,
  });
}

export function getAllIncomeTypes() {
  return request({
    url: "/income_type",
    method: "get",
  });
}

export function getSingleIncomeTypeDetails(id) {
  return request({
    url: "/income_type/" + id,
    method: "get",
  });
}

export function updateIncomeTypeDetails(data, id) {
  return request({
    url: "/income_type/" + id,
    method: "put",
    data,
  });
}

export function deleteIncomeType(id) {
  return request({
    url: "/income_type/" + id,
    method: "delete",
  });
}

// Payment methods down

export function getPaymentMethods() {
  return request({
    url: "/payment_methods",
    method: "get",
  });
}

export function addPaymentMethod(data){
  return request({
    url:'/payment_methods',
    method:'post',
    data
  })
}


/**Expenses */

export function getExpenseCategories(){
  return request({
    url:'/finance/expense/expense_categories',
    method:'get'
  })
}

export function addExpenseCategory(data){

  return request({
    url:'/finance/expense/expense_categories/',
    method:'post',
    data,
    
  })
}

export function addExpense(data){
  return request({
    url:'/finance/expense',
    method:'post',
    data
  })
}

export function updateExpense(data){
  return request({
    url:'/finance/expense',
    method:'put',
    data
  })
}

export function deleteExpense(id){
  return request({
    url:'/finance/expense/'+id,
    method:'delete',
  })
}

export function getExpenseByYear(year){
  return request({
    url:'/finance/expense/year/'+year,
    method:'get'
  })
}

export function getExpenseYears(){
  return request({
    url:'/finance/expense/year',
    method:'get'
  })
}

export function getExpenseByID(id){
  return request({
    url:'/finance/expense/'+id,
    method:'get'
  })
}