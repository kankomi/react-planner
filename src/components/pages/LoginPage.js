import React from 'react';

export default () => {
  return (
    <div className="container col-sm-3 login-form">
      <div className="card">
        <div className="card-header">
          <h3 className="mb-0">Login</h3>
        </div>
        <div className="card-body">
          <div className="form-row mb-2">
            <div className="col-md-3">
              <label htmlFor="username" className="col-form-label">
                Username
              </label>
            </div>
            <div className="col-md-9">
              <input
                className="form-control"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
            </div>
          </div>
          <div className="form-row mb-2">
            <div className="col-md-3">
              <label htmlFor="password" className="col-form-label">
                Password
              </label>
            </div>
            <div className="col-md-9">
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-dark mb-2 float-right"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
