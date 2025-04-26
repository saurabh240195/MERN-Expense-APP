import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransection }) => {
  // all transection
  const totalTransaction = allTransection.length;
  const totalIncomeTransaction = allTransection.filter(
    (transection) => transection.type === "income"
  );
  const totalExpenseTransection = allTransection.filter(
    (transection) => transection.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransaction.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransection.length / totalTransaction) * 100;

  // total turnover
  const totalTurnover = allTransection.reduce(
    (acc, transection) => acc + transection.amount,
    0
  );
  const totalIncomeTurnover = allTransection
    .filter((transection) => transection.type === "income")
    .reduce((acc, transection) => acc + transection.amount, 0);

  const totalExpenseTurnover = allTransection
    .filter((transection) => transection.type === "expense")
    .reduce((acc, transection) => acc + transection.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <h2>Analytics</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transection: {totalTransaction}
            </div>
            <div className="card-body">
              <h5 className="card-title text-success">
                Income: {totalIncomeTransaction.length}
              </h5>
              <h5 className="card-title text-danger">
                Expense: {totalExpenseTransection.length}
              </h5>
              <div>
                <Progress
                  className="mx-2"
                  strokeColor={"green"}
                  type="circle"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  className="mx-2"
                  strokeColor={"red"}
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total Turnover: {totalTurnover}</div>
            <div className="card-body">
              <h5 className="card-title text-success">
                Income Turnover: {totalIncomeTurnover}
              </h5>
              <h5 className="card-title text-danger">
                Expense Turnover: {totalExpenseTurnover}
              </h5>
              <div>
                <Progress
                  className="mx-2"
                  strokeColor={"green"}
                  type="circle"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  className="mx-2"
                  strokeColor={"red"}
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
