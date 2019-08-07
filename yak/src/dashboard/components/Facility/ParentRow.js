import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import MaterialIcon from 'material-icons-react';

// Return positive monthly goal
const GreenGoal = props => {
    // Math for percentage over/under
    let diff = Math.abs(props.goal - props.actual);
    let percent = 'NA';
    if (props.goal !== 0) {
        percent = ((diff / props.goal) * 100).toFixed(1);
    }
    return (
        <span>
      <MaterialIcon icon='trending_up' color='#4caf50' />
      <span className='iconText'>
        <span style={{ color: '#4caf50' }}> {percent}%</span> ({props.actual})
      </span>
    </span>
    );
};

// Return negative monthly goal
const RedGoal = props => {
    // Math for percentage over/under
    let diff = Math.abs(props.goal - props.actual);
    let percent = ((diff / props.goal) * 100).toFixed(1);
    return (
        <span>
      <MaterialIcon icon='trending_down' color='#f44336' />
      <span className='iconText'>
        <span style={{ color: '#f44336' }}> -{percent}%</span> ({props.actual})
      </span>
    </span>
    );
};

export default class ParentRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputGoal: 0,
            inputGoalSub1: 0,
            inputGoalSub2: 0,
            inputGoalSub3: 0
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    // Show/hide child rows
    toggleChildRows = name => {
        let x = document.getElementsByClassName(name);
        if (x[0].style.display === 'none') {
            for (let i = 0; i < x.length; i++) {
                x[i].style.display = 'table-row';
            }
        } else {
            for (let i = 0; i < x.length; i++) {
                x[i].style.display = 'none';
            }
        }
    };

    render() {
        const goal = 'goal' + this.props.fieldName;
        const goalSub1 = 'goal' + this.props.fieldName + 'Sub1';
        const goalSub2 = 'goal' + this.props.fieldName + 'Sub2';
        const goalSub3 = 'goal' + this.props.fieldName + 'Sub3';

        return (
            <TableBody>
                <TableRow key={this.props.fieldName} className='tableDataRow'>
                    <TableCell
                        component='th'
                        className='tableRowHeader parentRow'
                        onClick={() => this.toggleChildRows(this.props.fieldName)}
                    >
                        {this.props.fieldName}
                    </TableCell>
                    <TableCell>
                        <MaterialIcon icon='trending_down' color='#f44336' />
                        <span className='iconText'>
              <span className='redText'> -6%</span> (184)
            </span>
                    </TableCell>
                    <TableCell>
                        <MaterialIcon icon='trending_down' color='#f44336' />
                        <span className='iconText'>
              <span className='redText'> -6%</span> (184)
            </span>
                    </TableCell>
                    <TableCell>
                        <MaterialIcon icon='trending_up' color='#4caf50' />
                        <span className='iconText'>
              <span className='greenText'> 6%</span> (184)
            </span>
                    </TableCell>
                    <TableCell>
                        <TextField
                            id={goal}
                            placeholder='goal'
                            className='monthlyInput'
                            margin='none'
                            onChange={this.handleChange('inputGoal')}
                        />
                        {this.state.inputGoal <= 184 ? (
                            <GreenGoal goal={this.state.inputGoal} actual={184} />
                        ) : (
                            <RedGoal goal={this.state.inputGoal} actual={184} />
                        )}
                    </TableCell>
                </TableRow>

                <TableRow
                    key={goalSub1}
                    className={'tableDataRow subRow ' + this.props.fieldName}
                    style={{ display: 'none' }}
                >
                    <TableCell component='th' className='tableRowHeader'>
                        Organic & Referring
                    </TableCell>
                    <TableCell>
                        <MaterialIcon icon='trending_down' color='#f44336' />
                        <span className='iconText'>
              <span className='redText'> -6%</span> (62)
            </span>
                    </TableCell>
                    <TableCell>
                        <MaterialIcon icon='trending_down' color='#f44336' />
                        <span className='iconText'>
              <span className='redText'> -6%</span> (62)
            </span>
                    </TableCell>
                    <TableCell>
                        <MaterialIcon icon='trending_up' color='#4caf50' />
                        <span className='iconText'>
              <span className='greenText'> 6%</span> (62)
            </span>
                    </TableCell>
                    <TableCell>
                        <TextField
                            id={goalSub1}
                            placeholder='goal'
                            className='monthlyInput'
                            margin='none'
                            onChange={this.handleChange('inputGoalSub1')}
                        />
                        {this.state.inputGoalSub1 <= 62 ? (
                            <GreenGoal goal={this.state.inputGoalSub1} actual={62} />
                        ) : (
                            <RedGoal goal={this.state.inputGoalSub1} actual={62} />
                        )}
                    </TableCell>
                </TableRow>

                <TableRow
                    key={goalSub2}
                    className={'tableDataRow subRow ' + this.props.fieldName}
                    style={{ display: 'none' }}
                >
                    <TableCell component='th' className='tableRowHeader'>
                        Digital Advertising
                    </TableCell>
                    <TableCell>
                        <MaterialIcon icon='trending_down' color='#f44336' />
                        <span className='iconText'>
              <span className='redText'> -6%</span> (61)
            </span>
                    </TableCell>
                    <TableCell>
                        <MaterialIcon icon='trending_down' color='#f44336' />
                        <span className='iconText'>
              <span className='redText'> -6%</span> (61)
            </span>
                    </TableCell>
                    <TableCell>
                        <MaterialIcon icon='trending_up' color='#4caf50' />
                        <span className='iconText'>
              <span className='greenText'> 6%</span> (61)
            </span>
                    </TableCell>
                    <TableCell>
                        <TextField
                            id={goalSub2}
                            placeholder='goal'
                            className='monthlyInput'
                            margin='none'
                            onChange={this.handleChange('inputGoalSub2')}
                        />
                        {this.state.inputGoalSub2 <= 61 ? (
                            <GreenGoal goal={this.state.inputGoalSub2} actual={61} />
                        ) : (
                            <RedGoal goal={this.state.inputGoalSub2} actual={61} />
                        )}
                    </TableCell>
                </TableRow>

                <TableRow
                    key={goalSub3}
                    className={'tableDataRow subRow ' + this.props.fieldName}
                    style={{ display: 'none' }}
                >
                    <TableCell component='th' className='tableRowHeader'>
                        Traditional Advertising
                    </TableCell>
                    <TableCell>
                        <MaterialIcon icon='trending_down' color='#f44336' />
                        <span className='iconText'>
              <span className='redText'> -6%</span> (61)
            </span>
                    </TableCell>
                    <TableCell>
                        <MaterialIcon icon='trending_down' color='#f44336' />
                        <span className='iconText'>
              <span className='redText'> -6%</span> (61)
            </span>
                    </TableCell>
                    <TableCell>
                        <MaterialIcon icon='trending_up' color='#4caf50' />
                        <span className='iconText'>
              <span className='greenText'> 6%</span> (61)
            </span>
                    </TableCell>
                    <TableCell>
                        <TextField
                            id={goalSub3}
                            placeholder='goal'
                            className='monthlyInput'
                            margin='none'
                            onChange={this.handleChange('inputGoalSub3')}
                        />
                        {this.state.inputGoalSub3 <= 61 ? (
                            <GreenGoal goal={this.state.inputGoalSub3} actual={61} />
                        ) : (
                            <RedGoal goal={this.state.inputGoalSub3} actual={61} />
                        )}
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }
}
