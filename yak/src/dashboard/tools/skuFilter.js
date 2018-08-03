import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import MaterialIcon from 'material-icons-react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

class SKUFilter extends React.Component {

    constructor(props) {
        super(props);
    }

    current = this.props.selected;

    state = {
        Filter: this.current
    };

    // update sku filter state
    handleSelect = name => event => {
        // console.log(event.target.name, event.target.value);
        // dummy object so we don't clear other filter values
        let dummyObj = this.state.Filter;
        dummyObj[name] = event.target.value;

        this.setState({
            Filter: dummyObj
        });
        // console.log(this.state.Filter);

        // re-assign dummyObj
        dummyObj = this.state.Filter;

        // send update to main state
        this.props.onUpdate(dummyObj);
    };

    render() {
        return(
            <ExpansionPanel style={{width: '90%', display: 'inline-block', backgroundColor: '#EEEEEE', boxShadow: 'none', margin: '0'}}>
                <ExpansionPanelSummary expandIcon={<MaterialIcon icon='keyboard_arrow_down' color='#00C853' />}>
                    <Typography className="">SKU Filter</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        <form className="" noValidate autoComplete="off">
                            <FormControl style={{minWidth: '120px', paddingRight: '4px'}} className="">
                                <InputLabel htmlFor="filterNetwork">Network</InputLabel>
                                <Select
                                    value={this.state.Filter.network}
                                    onChange={this.handleSelect('network')}
                                    inputProps={{
                                        name: 'network',
                                        id: 'filterNetwork',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'a0'}>All</MenuItem>
                                    <MenuItem value={'a1'}>Search</MenuItem>
                                    <MenuItem value={'a2'}>Display</MenuItem>
                                    <MenuItem value={'a3'}>Social</MenuItem>
                                    <MenuItem value={'a4'}>Email</MenuItem>
                                    <MenuItem value={'a5'}>Ad_Video</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{minWidth: '120px', paddingLeft: '4px', paddingRight: '4px'}} className="">
                                <InputLabel htmlFor="filterTargeting">Targeting</InputLabel>
                                <Select
                                    value={this.state.Filter.targetingMethod}
                                    onChange={this.handleSelect('targetingMethod')}
                                    inputProps={{
                                        name: 'targetingMethod',
                                        id: 'filterTargeting',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'b0'}>All</MenuItem>
                                    <MenuItem value={'b1'}>KWD</MenuItem>
                                    <MenuItem value={'b2'}>MP</MenuItem>
                                    <MenuItem value={'b3'}>MP-KWD</MenuItem>
                                    <MenuItem value={'b4'}>Topic</MenuItem>
                                    <MenuItem value={'b5'}>Topic-KWD</MenuItem>
                                    <MenuItem value={'b6'}>Connection</MenuItem>
                                    <MenuItem value={'b7'}>Behavior</MenuItem>
                                    <MenuItem value={'b8'}>Demographic</MenuItem>
                                    <MenuItem value={'b9'}>Interest</MenuItem>
                                    <MenuItem value={'b10'}>Lookalike</MenuItem>
                                    <MenuItem value={'b11'}>Remarketing</MenuItem>
                                    <MenuItem value={'b12'}>Newsletter - About</MenuItem>
                                    <MenuItem value={'b13'}>Newsletter - Programs</MenuItem>
                                    <MenuItem value={'b14'}>Newsletter - Addiction</MenuItem>
                                    <MenuItem value={'b15'}>Newsletter - PTSD</MenuItem>
                                    <MenuItem value={'b16'}>Newsletter - MH</MenuItem>
                                    <MenuItem value={'b17'}>Run of Site</MenuItem>
                                    <MenuItem value={'b18'}>Geographic</MenuItem>
                                    <MenuItem value={'b19'}>Conversion</MenuItem>
                                    <MenuItem value={'b20'}>Newsletter - Mood</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{minWidth: '120px', paddingLeft: '4px', paddingRight: '4px'}}>
                                <InputLabel htmlFor="filterFormat">Format</InputLabel>
                                <Select
                                    value={this.state.Filter.format}
                                    onChange={this.handleSelect('format')}
                                    inputProps={{
                                        name: 'format',
                                        id: 'filterFormat',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'c0'}>All</MenuItem>
                                    <MenuItem value={'c1'}>CanvasAd</MenuItem>
                                    <MenuItem value={'c2'}>ETA</MenuItem>
                                    <MenuItem value={'c3'}>GIF</MenuItem>
                                    <MenuItem value={'c4'}>GmailAd</MenuItem>
                                    <MenuItem value={'c5'}>HTML</MenuItem>
                                    <MenuItem value={'c6'}>Image Carousel</MenuItem>
                                    <MenuItem value={'c7'}>Lightbox</MenuItem>
                                    <MenuItem value={'c8'}>Link Post</MenuItem>
                                    <MenuItem value={'c9'}>Photo Post</MenuItem>
                                    <MenuItem value={'c10'}>Responsive</MenuItem>
                                    <MenuItem value={'c11'}>Static Image</MenuItem>
                                    <MenuItem value={'c12'}>Video</MenuItem>
                                    <MenuItem value={'c13'}>Video Carousel</MenuItem>
                                    <MenuItem value={'c14'}>Long Content - No Image</MenuItem>
                                    <MenuItem value={'c15'}>Long Content - Image</MenuItem>
                                    <MenuItem value={'c16'}>Short Content - No Image</MenuItem>
                                    <MenuItem value={'c17'}>Short Content - Image</MenuItem>
                                    <MenuItem value={'c18'}>Banner</MenuItem>
                                    <MenuItem value={'c19'}>Profile</MenuItem>
                                    <MenuItem value={'c20'}>Text Ad</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{minWidth: '120px', paddingLeft: '4px', paddingRight: '4px'}}>
                                <InputLabel htmlFor="filterMessage">Message</InputLabel>
                                <Select
                                    value={this.state.Filter.message}
                                    onChange={this.handleSelect('message')}
                                    inputProps={{
                                        name: 'message',
                                        id: 'filterMessage',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'d0'}>All</MenuItem>
                                    <MenuItem value={'d1'}>About - General</MenuItem>
                                    <MenuItem value={'d2'}>About - Other</MenuItem>
                                    <MenuItem value={'d3'}>About - Self</MenuItem>
                                    <MenuItem value={'d4'}>Benefits - General</MenuItem>
                                    <MenuItem value={'d5'}>Benefits - Other</MenuItem>
                                    <MenuItem value={'d6'}>Benefits - Self</MenuItem>
                                    <MenuItem value={'d7'}>Emotion - General</MenuItem>
                                    <MenuItem value={'d8'}>Emotion - Other</MenuItem>
                                    <MenuItem value={'d9'}>Emotion - Self</MenuItem>
                                    <MenuItem value={'d10'}>Leading - General</MenuItem>
                                    <MenuItem value={'d11'}>Leading - Other</MenuItem>
                                    <MenuItem value={'d12'}>Leading - Self</MenuItem>
                                    <MenuItem value={'d13'}>Scare - General</MenuItem>
                                    <MenuItem value={'d14'}>Scare - Other</MenuItem>
                                    <MenuItem value={'d15'}>Scare - Self</MenuItem>
                                    <MenuItem value={'d16'}>Stats - General</MenuItem>
                                    <MenuItem value={'d17'}>Stats - Other</MenuItem>
                                    <MenuItem value={'d18'}>Stats - Self</MenuItem>
                                    <MenuItem value={'d19'}>Urgent - General</MenuItem>
                                    <MenuItem value={'d20'}>Urgent - Other</MenuItem>
                                    <MenuItem value={'d21'}>Urgent - Self</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{minWidth: '120px', paddingLeft: '4px', paddingRight: '4px'}} className="">
                                <InputLabel htmlFor="filterAgeRange">Age Range</InputLabel>
                                <Select
                                    value={this.state.Filter.ageRange}
                                    onChange={this.handleSelect('ageRange')}
                                    inputProps={{
                                        name: 'ageRange',
                                        id: 'filterAgeRange',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'e0'}>All</MenuItem>
                                    <MenuItem value={'e1'}>18 - 24</MenuItem>
                                    <MenuItem value={'e2'}>25 - 34</MenuItem>
                                    <MenuItem value={'e3'}>35 - 44</MenuItem>
                                    <MenuItem value={'e4'}>45 - 54</MenuItem>
                                    <MenuItem value={'e5'}>55 - 64</MenuItem>
                                    <MenuItem value={'e6'}>65+</MenuItem>
                                    <MenuItem value={'e7'}>Undetermined</MenuItem>

                                </Select>
                            </FormControl>
                            <FormControl style={{minWidth: '120px', paddingLeft: '4px', paddingRight: '4px'}} className="">
                                <InputLabel htmlFor="filterEthnicity">Ethnicity</InputLabel>
                                <Select
                                    value={this.state.Filter.ethnicity}
                                    onChange={this.handleSelect('ethnicity')}
                                    inputProps={{
                                        name: 'ethnicity',
                                        id: 'filterEthnicity',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'f9'}>All</MenuItem>
                                    <MenuItem value={'f1'}>African American</MenuItem>
                                    <MenuItem value={'f2'}>Asian</MenuItem>
                                    <MenuItem value={'f3'}>Hispanic</MenuItem>
                                    <MenuItem value={'f4'}>Native American</MenuItem>
                                    <MenuItem value={'f5'}>Pacific Islander</MenuItem>
                                    <MenuItem value={'f6'}>Two or more</MenuItem>
                                    <MenuItem value={'f7'}>White</MenuItem>
                                    <MenuItem value={'f8'}>Undetermined</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{minWidth: '120px', paddingLeft: '4px', paddingRight: '4px'}} className="">
                                <InputLabel htmlFor="filterFamilyRole">Family Role</InputLabel>
                                <Select
                                    value={this.state.Filter.familyRole}
                                    onChange={this.handleSelect('familyRole')}
                                    inputProps={{
                                        name: 'familyRole',
                                        id: 'filterFamilyRole',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'g0'}>All</MenuItem>
                                    <MenuItem value={'g1'}>Brother</MenuItem>
                                    <MenuItem value={'g2'}>Daughter</MenuItem>
                                    <MenuItem value={'g3'}>Husband</MenuItem>
                                    <MenuItem value={'g4'}>Parent - Expecting</MenuItem>
                                    <MenuItem value={'g5'}>Parent - 0-12 Month</MenuItem>
                                    <MenuItem value={'g6'}>Parent - Pre-Teen</MenuItem>
                                    <MenuItem value={'g7'}>Parent - Teen</MenuItem>
                                    <MenuItem value={'g8'}>Parent - Adult Child</MenuItem>
                                    <MenuItem value={'g9'}>Sister</MenuItem>
                                    <MenuItem value={'g10'}>Son</MenuItem>
                                    <MenuItem value={'g11'}>Wife</MenuItem>
                                    <MenuItem value={'g12'}>Undetermined</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{minWidth: '120px', paddingLeft: '4px', paddingRight: '4px'}} className="">
                                <InputLabel htmlFor="filterGender">Gender</InputLabel>
                                <Select
                                    value={this.state.Filter.gender}
                                    onChange={this.handleSelect('gender')}
                                    inputProps={{
                                        name: 'gender',
                                        id: 'filterGender',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'h0'}>All</MenuItem>
                                    <MenuItem value={'h1'}>Female</MenuItem>
                                    <MenuItem value={'h2'}>Male</MenuItem>
                                    <MenuItem value={'h3'}>Undetermined</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{minWidth: '120px', paddingLeft: '4px', paddingRight: '4px'}} className="">
                                <InputLabel htmlFor="filterIncome">Income</InputLabel>
                                <Select
                                    value={this.state.Filter.income}
                                    onChange={this.handleSelect('income')}
                                    inputProps={{
                                        name: 'income',
                                        id: 'filterIncome',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'i0'}>All</MenuItem>
                                    <MenuItem value={'i1'}>39k or less</MenuItem>
                                    <MenuItem value={'i2'}>40k - 49k</MenuItem>
                                    <MenuItem value={'i3'}>50k - 74k</MenuItem>
                                    <MenuItem value={'i4'}>75k - 99k</MenuItem>
                                    <MenuItem value={'i5'}>100k - 124k</MenuItem>
                                    <MenuItem value={'i6'}>125k - 149k</MenuItem>
                                    <MenuItem value={'i7'}>150k - 249k</MenuItem>
                                    <MenuItem value={'i8'}>250k - 349k</MenuItem>
                                    <MenuItem value={'i9'}>350k - 499k</MenuItem>
                                    <MenuItem value={'i10'}>500k or more</MenuItem>
                                    <MenuItem value={'i11'}>Undetermined</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{minWidth: '150px', paddingLeft: '4px', paddingRight: '4px'}} className="">
                                <InputLabel htmlFor="filterInterestsBehaviors">Interest/Behavior</InputLabel>
                                <Select
                                    value={this.state.Filter.interestsBehaviors}
                                    onChange={this.handleSelect('interestsBehaviors')}
                                    inputProps={{
                                        name: 'interestsBehaviors',
                                        id: 'filterInterestsBehaviors',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'j0'}>All</MenuItem>
                                    <MenuItem value={'j1'}>Away from Family</MenuItem>
                                    <MenuItem value={'j2'}>Away from Home</MenuItem>
                                    <MenuItem value={'j3'}>Business and Industry</MenuItem>
                                    <MenuItem value={'j4'}>Chronic Relapser</MenuItem>
                                    <MenuItem value={'j5'}>Democrat</MenuItem>
                                    <MenuItem value={'j6'}>Detox Seeker</MenuItem>
                                    <MenuItem value={'j7'}>Entertainment</MenuItem>
                                    <MenuItem value={'j8'}>Fitness and Wellness</MenuItem>
                                    <MenuItem value={'j9'}>Food and Drink</MenuItem>
                                    <MenuItem value={'j10'}>Friends of Alumni</MenuItem>
                                    <MenuItem value={'j11'}>LGBT Population</MenuItem>
                                    <MenuItem value={'j12'}>Outdoors</MenuItem>
                                    <MenuItem value={'j13'}>Politics</MenuItem>
                                    <MenuItem value={'j14'}>Previous Patient of Competitor</MenuItem>
                                    <MenuItem value={'j15'}>Republican</MenuItem>
                                    <MenuItem value={'j16'}>Shopping and Fashion</MenuItem>
                                    <MenuItem value={'j17'}>Sports</MenuItem>
                                    <MenuItem value={'j18'}>Technology</MenuItem>
                                    <MenuItem value={'j19'}>Travel</MenuItem>
                                    <MenuItem value={'j20'}>Undetermined</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{minWidth: '120px', paddingLeft: '4px', paddingRight: '4px'}} className="">
                                <InputLabel htmlFor="filterLanguage">Language</InputLabel>
                                <Select
                                    value={this.state.Filter.language}
                                    onChange={this.handleSelect('language')}
                                    inputProps={{
                                        name: 'language',
                                        id: 'filterLanguage',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'k0'}>All</MenuItem>
                                    <MenuItem value={'k1'}>English</MenuItem>
                                    <MenuItem value={'k2'}>Spanish</MenuItem>
                                    <MenuItem value={'k3'}>Bilingual</MenuItem>
                                    <MenuItem value={'k4'}>Undetermined</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{minWidth: '120px', paddingLeft: '4px', paddingRight: '4px'}} className="">
                                <InputLabel htmlFor="filterEducation">Education</InputLabel>
                                <Select
                                    value={this.state.Filter.education}
                                    onChange={this.handleSelect('education')}
                                    inputProps={{
                                        name: 'education',
                                        id: 'filterEducation',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'l0'}>All</MenuItem>
                                    <MenuItem value={'l1'}>Some High School</MenuItem>
                                    <MenuItem value={'l2'}>High School Grad</MenuItem>
                                    <MenuItem value={'l3'}>Associate Degree</MenuItem>
                                    <MenuItem value={'l4'}>Some College</MenuItem>
                                    <MenuItem value={'l5'}>College Grad</MenuItem>
                                    <MenuItem value={'l6'}>Professional Degree</MenuItem>
                                    <MenuItem value={'l7'}>Some Grad School</MenuItem>
                                    <MenuItem value={'l8'}>Masters Degree</MenuItem>
                                    <MenuItem value={'l9'}>Doctorate Degree</MenuItem>
                                    <MenuItem value={'l10'}>Undetermined</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{minWidth: '120px', paddingLeft: '4px', paddingRight: '4px'}} className="">
                                <InputLabel htmlFor="filterOccupation">Occupation</InputLabel>
                                <Select
                                    value={this.state.Filter.occupation}
                                    onChange={this.handleSelect('occupation')}
                                    inputProps={{
                                        name: 'occupation',
                                        id: 'filterOccupation',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'m17'}>All</MenuItem>
                                    <MenuItem value={'m1'}>Admin</MenuItem>
                                    <MenuItem value={'m2'}>Arts</MenuItem>
                                    <MenuItem value={'m3'}>Business/Finance</MenuItem>
                                    <MenuItem value={'m4'}>Executive</MenuItem>
                                    <MenuItem value={'m5'}>Government</MenuItem>
                                    <MenuItem value={'m6'}>Healthcare</MenuItem>
                                    <MenuItem value={'m7'}>IT</MenuItem>
                                    <MenuItem value={'m8'}>Legal</MenuItem>
                                    <MenuItem value={'m9'}>Manufacturing</MenuItem>
                                    <MenuItem value={'m10'}>Sales</MenuItem>
                                    <MenuItem value={'m11'}>Service</MenuItem>
                                    <MenuItem value={'m12'}>Student - College</MenuItem>
                                    <MenuItem value={'m13'}>Student - Grad School</MenuItem>
                                    <MenuItem value={'m14'}>Student - High School</MenuItem>
                                    <MenuItem value={'m15'}>Unemployed</MenuItem>
                                    <MenuItem value={'m16'}>Undetermined</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{minWidth: '120px', paddingLeft: '4px', paddingRight: '4px'}} className="">
                                <InputLabel htmlFor="filterRelationship">Relationship</InputLabel>
                                <Select
                                    value={this.state.Filter.relationship}
                                    onChange={this.handleSelect('relationship')}
                                    inputProps={{
                                        name: 'relationship',
                                        id: 'filterRelationship',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'n6'}>All</MenuItem>
                                    <MenuItem value={'n1'}>Divorced</MenuItem>
                                    <MenuItem value={'n2'}>Married</MenuItem>
                                    <MenuItem value={'n3'}>Separated</MenuItem>
                                    <MenuItem value={'n4'}>Single</MenuItem>
                                    <MenuItem value={'n5'}>Undetermined</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{minWidth: '120px', paddingLeft: '4px'}} className="">
                                <InputLabel htmlFor="filterReligion">Religion</InputLabel>
                                <Select
                                    value={this.state.Filter.religion}
                                    onChange={this.handleSelect('religion')}
                                    inputProps={{
                                        name: 'religion',
                                        id: 'filterReligion',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'o11'}>All</MenuItem>
                                    <MenuItem value={'o1'}>Agnosticism</MenuItem>
                                    <MenuItem value={'o2'}>Atheism</MenuItem>
                                    <MenuItem value={'o3'}>Buddhism</MenuItem>
                                    <MenuItem value={'o4'}>Christianity</MenuItem>
                                    <MenuItem value={'o5'}>Hindu</MenuItem>
                                    <MenuItem value={'o6'}>Islam</MenuItem>
                                    <MenuItem value={'o7'}>Judaism</MenuItem>
                                    <MenuItem value={'o8'}>Mormonism</MenuItem>
                                    <MenuItem value={'o9'}>Sikhism</MenuItem>
                                    <MenuItem value={'o10'}>Undetermined</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default SKUFilter;