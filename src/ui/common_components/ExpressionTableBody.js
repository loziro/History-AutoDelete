import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";
import {
	removeExpressionUI,
	updateExpressionUI
} from "../UIActions";

const styles = {actionButton: {margin: "0 5px"}};

const ActionButtonColumn = ({
	id, editId, onRemoveExpression, onUpdateExpression, editMode, setEdit, expression, expressionInput
}) => (
	<td style={{width: "60px"}}>
		<i onClick={() => onRemoveExpression({id})} style={styles.actionButton} className="fa fa-times fa-2x cursorPoint" aria-hidden="true"></i>
		{
			editMode && id === editId ? <i onClick={() => setEdit({
				editMode: false, id, expressionInput: expression
			})} style={styles.actionButton} className="fa fa-eraser fa-2x  cursorPoint" aria-hidden="true"></i> :
				<i onClick={() => setEdit({
					editMode: true, id, expressionInput: expression
				})} style={styles.actionButton} className="fa fa-pencil-square-o fa-2x  cursorPoint" aria-hidden="true"></i>

		}
		{
			editMode && id === editId ?
				<i
					onClick={() => {
						setEdit({editMode: false});
						onUpdateExpression({
							id, expression: expressionInput
						});
					}}
					style={styles.actionButton}
					className="fa fa-floppy-o fa-2x cursorPoint"
					aria-hidden="true"
				>
				</i> : ""
		}

	</td>
);

ActionButtonColumn.propTypes = {
	id: PropTypes.string.isRequired,
	editId: PropTypes.string.isRequired,
	onRemoveExpression: PropTypes.func.isRequired,
	onUpdateExpression: PropTypes.func.isRequired,
	editMode: PropTypes.bool.isRequired,
	setEdit: PropTypes.func.isRequired,
	expression: PropTypes.object.isRequired,
	expressionInput: PropTypes.string.isRequired
};

class ExpressionTableBody extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expressionInput: "",
			editMode: false,
			id: ""
		};
	}

	setEdit(editModeObject) {
		this.setState(editModeObject);
	}

	render() {
		const {
			onRemoveExpression, onUpdateExpression, expressions
		} = this.props;
		const {
			editMode, id, expressionInput
		} = this.state;
		return (
			<tbody>
				{
					expressions.map((expression) => (
						<tr key={expression.id}>
							<ActionButtonColumn
								editMode={this.state.editMode}
								id={expression.id}
								expression={expression.expression}
								expressionInput={expressionInput}
								editId={id}
								onRemoveExpression={(payload) => onRemoveExpression(payload)}
								onUpdateExpression={(payload) => onUpdateExpression(payload)}
								setEdit={(editModeObject) => this.setEdit(editModeObject)}
							/>
							{
								editMode & id === expression.id ?
									<div className="md-form">
										<input id="form1" className="form-control" value={expressionInput} onChange={(e) => this.setState({expressionInput: e.target.value})} type="text" />
									</div> :
									<td>{`${expression.expression}`}</td>
							}
							<td>{`${expression.regExp}`}</td>
						</tr>
					))
				}
			</tbody>
		);
	}
}

ExpressionTableBody.propTypes = {
	onRemoveExpression: PropTypes.func.isRequired,
	onUpdateExpression: PropTypes.func.isRequired,
	expressions: PropTypes.array.isRequired
};

const mapDispatchToProps = (dispatch) => ({
	onRemoveExpression(payload) {
		dispatch(
			removeExpressionUI(payload)
		);
	},
	onUpdateExpression(payload) {
		dispatch(
			updateExpressionUI(payload)
		);
	}
});
export default connect(null, mapDispatchToProps)(ExpressionTableBody);
