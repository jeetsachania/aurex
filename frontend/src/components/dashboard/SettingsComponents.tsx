interface Props {
  email?: string;
  username?: string;
}

const UserSettingsForm: React.FC<Props> = ({ email, username }) => {
  return (
    <form>
      <div className="col-md-12 mb-3">
        <div className="input-group">
          <div className="input-group-append">
            <span className="input-group-text input-group-icon">
              <i className="bi bi-envelope-fill"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control custom-form-input"
            id="email"
            value={email ?? ""}
            disabled
          />
        </div>
      </div>
      <div className="input-group">
        <div className="input-group-append">
          <span className="input-group-text input-group-icon">
            <i className="bi bi-person-fill"></i>
          </span>
        </div>
        <input
          type="text"
          className="form-control custom-form-input"
          id="username"
          value={username ?? ""}
          disabled
        />
      </div>
    </form>
  );
};

export default UserSettingsForm;
