const AdminCards = ({ noOfUsers, avgTime, avgAttempts }) => {
  return (
    <div className="AdminCards mx-5 px-5 mt-5">
      <div className="row d-flex justify-content-center">
        {/* User card */}
        <div className="col-xl-3 col-lg-6">
          <div className="card l-bg-cherry">
            <div className="card-statistic-3 p-4">
              <div className="mb-4">
                <h5 className="card-title mb-0">Total Number of Users</h5>
              </div>
              <div className="col-8">
                <h2 className="d-flex align-items-center mb-0">{noOfUsers}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Avg time card */}
        <div className="col-xl-3 col-lg-6">
          <div className="card l-bg-blue-dark">
            <div className="card-statistic-3 p-4">
              <div className="mb-4">
                <h5 className="card-title mb-0">Avg Time Spent.</h5>
              </div>
              <div className="col-8">
                <h2 className="d-flex align-items-center mb-0">{avgTime} sec</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Avg attempts */}
        <div className="col-xl-3 col-lg-6">
          <div className="card l-bg-green-dark">
            <div className="card-statistic-3 p-4">
              <div className="mb-4">
                <h5 className="card-title mb-0">Avg. attempts per level.</h5>
              </div>
              <div className="col-8">
                <h2 className="d-flex align-items-center mb-0">
                  {avgAttempts}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCards;
