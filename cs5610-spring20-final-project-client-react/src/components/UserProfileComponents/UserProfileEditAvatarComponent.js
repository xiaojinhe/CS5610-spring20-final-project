import React from "react";
import {USER_ICON_PATH} from "../../common/constants";

class UserProfileEditAvatarComponent extends React.Component {
  state = {
    previewingAvatarURL: this.props.user.avatarURL
  };

  onAvatarChange = (event) => {
    this.setState({
      previewingAvatarURL: event.target.value
    })
  };

  onAvatarReset = () => {
    this.setState(prevState => ({
      previewingAvatarURL: this.props.user.avatarURL
    }))
  };


  render() {
    return (
      <div className="col-sm-10">
        <div className="input-group">
          <input readOnly
                 className="form-control"
                 id="avatar"
                 value={this.props.user.avatarURL}/>
          <div className="input-group-prepend">
            <button type="button" className="btn btn-primary" data-toggle="modal"
                    data-target="#staticBackdrop" onClick={this.onAvatarReset}>
              Click to change
            </button>
          </div>
        </div>
        <div className="modal fade" id="staticBackdrop" data-backdrop="static"
             role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Change photo</h5>
                <button type="button" className="close"
                        data-dismiss="modal" aria-label="Close"
                        onClick={this.onAvatarReset}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group row">
                  <label htmlFor="role"
                         className="col-sm-2 col-form-label">
                    Avatar
                  </label>
                  <div className="col-sm-10">
                    <input type="text"
                           className="form-control"
                           placeholder="Photo URL"
                           value={this.state.previewingAvatarURL}
                           onChange={this.onAvatarChange}
                    />
                  </div>
                </div>

                <h4 className='mt-3'>Preview: </h4>
                <img src={this.state.previewingAvatarURL ? this.state.previewingAvatarURL : USER_ICON_PATH}
                     className={`rounded-circle user-icon-preview border d-flex mx-auto 
                                    ${this.state.previewingAvatarURL ? '' : 'p-3'}`
                     }
                     alt="user-icon-preview"/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary"
                        data-dismiss="modal" onClick={this.onAvatarReset}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary"
                        data-dismiss="modal" onClick={() => this.props.onAvatarSave(this.state.previewingAvatarURL)}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default UserProfileEditAvatarComponent;
