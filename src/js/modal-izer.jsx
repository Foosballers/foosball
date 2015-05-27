var React = require('react');

var BootstrapModalMixin = function() {
  var handlerProps =
    ['handleShow', 'handleShown', 'handleHide', 'handleHidden']

  var bsModalEvents = {
    handleShow: 'show.bs.modal'
  , handleShown: 'shown.bs.modal'
  , handleHide: 'hide.bs.modal'
  , handleHidden: 'hidden.bs.modal'
  }

  return {
    propTypes: {
      handleShow: React.PropTypes.func
    , handleShown: React.PropTypes.func
    , handleHide: React.PropTypes.func
    , handleHidden: React.PropTypes.func
    , backdrop: React.PropTypes.bool
    , keyboard: React.PropTypes.bool
    , show: React.PropTypes.bool
    , remote: React.PropTypes.string
    }

  , getDefaultProps: function() {
      return {
        backdrop: true
      , keyboard: true
      , show: true
      , remote: ''
      }
    }

  , componentDidMount: function() {
      var $modal = $(this.getDOMNode()).modal({
        backdrop: this.props.backdrop
      , keyboard: this.props.keyboard
      , show: this.props.show
      , remote: this.props.remote
      })
      handlerProps.forEach(function(prop) {
        if (this[prop]) {
          $modal.on(bsModalEvents[prop], this[prop])
        }
        if (this.props[prop]) {
          $modal.on(bsModalEvents[prop], this.props[prop])
        }
      }.bind(this))
    }

  , componentWillUnmount: function() {
      var $modal = $(this.getDOMNode())
      handlerProps.forEach(function(prop) {
        if (this[prop]) {
          $modal.off(bsModalEvents[prop], this[prop])
        }
        if (this.props[prop]) {
          $modal.off(bsModalEvents[prop], this.props[prop])
        }
      }.bind(this))
    }
  , hide: function() {
      $(this.getDOMNode()).modal('hide')
    }
  , show: function() {
      $(this.getDOMNode()).modal('show')
    }
  , toggle: function() {
      $(this.getDOMNode()).modal('toggle')
    }
  }
}()
//

module.exports = React.createClass({
  mixins: [BootstrapModalMixin]
, handleShown: function() {
  this.refs._xclose.getDOMNode().focus();
}
, displayName: 'Modalizer'
 
, render: function() {
    var buttons = this.props.buttons.map(function(button, idx) {
      return <button type="button" className={'btn btn-' + button.type} onClick={button.handler} key={idx} >
        {button.text}
      </button>
    })
    return <div className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" ref="_xclose" onClick={this.hide}>×</button>
            <strong>{this.props.header}</strong>
          </div>
          <div className="modal-body">
            {this.props.children}
          </div>
          <div className="modal-footer">
            {buttons}
          </div>
        </div>
      </div>
    </div>
  }
})
 
