import React from 'react';
import MaterialIcon from 'material-icons-react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import skuCodes from './skucodes';


class DataFilter extends React.Component {

    currentFilter = this.props.selected;
    rightDrawer = this.props.rightDrawer;

    state = {
        Filter: this.currentFilter,
        right: this.rightDrawer
    };

    toggleDrawer = (side) => () => {
        this.setState({
            [side]: !this.state.right,
        });
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

    // clear filters from state
    clearFilters = () => {
        let cleanFilter = {
            conversion: [],
            touch: [],
            rollup: [],
            channel: [],
            source: [],
            campaign: [],
            tier: [],
            medium: [],
            disorder: [],
            network: [],
            targetingMethod: [],
            format: [],
            message: [],
            ageRange: [],
            ethnicity: [],
            familyRole: [],
            gender: [],
            income: [],
            interestsBehaviors: [],
            language: [],
            education: [],
            occupation: [],
            relationship: [],
            religion: []
        };

        this.setState({
            Filter: cleanFilter
        });

        this.props.onUpdate(cleanFilter);
    };

    render() {
        return (
            <div className="filterComponent">
                <Tooltip title="Show Filters" placement="bottom">
                    <Button onClick={this.toggleDrawer('right')} style={{top: '5px'}}>
                        <MaterialIcon icon='filter_list' size={24} color='#ff9800'/>
                    </Button>
                </Tooltip>

                <Drawer
                    anchor="right"
                    open={this.state.right}
                    onClose={this.toggleDrawer('right')}
                    style={{display: 'block'}}
                >
                    <div style={{margin: 'auto', position: 'absolute', bottom: '8px', left: '25%'}}>
                        <Button variant="contained"
                                style={{backgroundColor: '#ff9800', color: '#ffffff', margin: '5px'}}
                                onClick={() => {
                                    this.toggleDrawer('right', false);
                                    window.location.reload();
                                }}>
                            Apply
                        </Button>
                        <Button variant="contained" style={{margin: '5px'}}
                                onClick={() => {
                                    this.clearFilters();
                                    //window.location.reload();
                                }}>
                            Clear
                        </Button>
                    </div>
                    <div
                        style={{width: 400, padding: 20, paddingTop: 5, height: '90%', overflowY: 'scroll'}}
                        tabIndex={0}
                        role="button"
                        onKeyDown={this.toggleDrawer('right')}
                    >
                        <form className="skuFilter" noValidate autoComplete="off">
                            <FormControl className="">
                                <InputLabel htmlFor="filterConversion">Conversion</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.conversion}
                                    onChange={this.handleSelect('conversion')}
                                    inputProps={{
                                        name: 'conversion',
                                        id: 'filterConversion',
                                    }}
                                >
                                    <MenuItem value={'all'}>All</MenuItem>
                                    <MenuItem value={'phone'}>Phone Call</MenuItem>
                                    <MenuItem value={'webForm'}>Web Form</MenuItem>
                                    <MenuItem value={'tos5'}>5+ TOS</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterTouch">Touch</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.touch}
                                    onChange={this.handleSelect('touch')}
                                    inputProps={{
                                        name: 'touch',
                                        id: 'filterTouch',
                                    }}
                                >
                                    <MenuItem value={'first'}>First</MenuItem>
                                    <MenuItem value={'converting'}>Converting</MenuItem>
                                    <MenuItem value={'Latest'}>Latest</MenuItem>
                                    <MenuItem value={'contributing'}>Contributing</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterRollup">Rollup</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.rollup}
                                    onChange={this.handleSelect('rollup')}
                                    inputProps={{
                                        name: 'rollup',
                                        id: 'filterRollup',
                                    }}
                                >
                                    <MenuItem value={'direct'}>Direct</MenuItem>
                                    <MenuItem value={'email'}>Email</MenuItem>
                                    <MenuItem value={'organic'}>Organic</MenuItem>
                                    <MenuItem value={'paidAdvertising'}>Paid Advertising</MenuItem>
                                    <MenuItem value={'referring'}>Referring</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterChannel">Channel</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.channel}
                                    onChange={this.handleSelect('channel')}
                                    inputProps={{
                                        name: 'channel',
                                        id: 'filterChannel',
                                    }}
                                >
                                    <MenuItem value={'all'}>All</MenuItem>
                                    <MenuItem value={'direct'}>Direct</MenuItem>
                                    <MenuItem value={'email'}>Email</MenuItem>
                                    <MenuItem value={'email_leadGen'}>Email - Lead Gen</MenuItem>
                                    <MenuItem value={'email_other'}>Email - Other</MenuItem>
                                    <MenuItem value={'email_signUp'}>Email - Sign Up</MenuItem>
                                    <MenuItem value={'organic'}>Organic</MenuItem>
                                    <MenuItem value={'organic_other'}>Organic - Other</MenuItem>
                                    <MenuItem value={'organic_bing'}>Organic - Bing</MenuItem>
                                    <MenuItem value={'organic_google'}>Organic - Google</MenuItem>
                                    <MenuItem value={'organic_yahoo'}>Organic - Yahoo</MenuItem>
                                    <MenuItem value={'organic_other_search'}>Organic - Search - Other</MenuItem>
                                    <MenuItem value={'organic_facebook'}>Organic - Facebook</MenuItem>
                                    <MenuItem value={'organic_instagram'}>Organic - Instagram</MenuItem>
                                    <MenuItem value={'organic_linkedin'}>Organic - LinkedIn</MenuItem>
                                    <MenuItem value={'organic_pinterest'}>Organic - Pinterest</MenuItem>
                                    <MenuItem value={'organic_youtube'}>Organic - YouTube</MenuItem>
                                    <MenuItem value={'organic_other_social'}>Organic - Social - Other</MenuItem>
                                    <MenuItem value={'paidAdvertising'}>Paid Advertising</MenuItem>
                                    <MenuItem value={'referring'}>Referring</MenuItem>
                                    <MenuItem value={'referring'}>Referring - Directories - Choose Help</MenuItem>
                                    <MenuItem value={'referring'}>Referring - Directories - Choose Help -
                                        Alcohol</MenuItem>
                                    <MenuItem value={'referring'}>Referring - Directories - Other</MenuItem>
                                    <MenuItem value={'referring'}>Referring - Directories - Psych Today</MenuItem>
                                    <MenuItem value={'referring'}>Referring - Directories - Psych Today -
                                        Alcohol</MenuItem>
                                    <MenuItem value={'referring'}>Referring - Directories - Yellow Pages</MenuItem>
                                    <MenuItem value={'referring'}>Referring - Directories - Yellow Pages -
                                        Alcohol</MenuItem>
                                    <MenuItem value={'referring'}>Referring - Directories - Yelp</MenuItem>
                                    <MenuItem value={'referring'}>Referring - Directories - Yelp - Alcohol</MenuItem>
                                    <MenuItem value={'referring'}>Referring - Internal</MenuItem>
                                    <MenuItem value={'referring'}>Referring - Internal - Acadia</MenuItem>
                                    <MenuItem value={'referring'}>Referring - Internal - ARC</MenuItem>
                                    <MenuItem value={'referring'}>Referring - Internal - Something Fishy</MenuItem>
                                    <MenuItem value={'referring'}>Referring - Other</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl className="">
                                <InputLabel htmlFor="filterSource">Source</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.source}
                                    onChange={this.handleSelect('source')}
                                    inputProps={{
                                        name: 'source',
                                        id: 'filterSource',
                                    }}
                                >
                                    <MenuItem value={'all'}>All</MenuItem>
                                    <MenuItem value={'acadia'}>Acadia</MenuItem>
                                    <MenuItem value={'arc'}>ARC</MenuItem>
                                    <MenuItem value={'bing'}>Bing</MenuItem>
                                    <MenuItem value={'chooseHelp'}>Choose Help</MenuItem>
                                    <MenuItem value={'exactTarget'}>Exact Target</MenuItem>
                                    <MenuItem value={'facebook'}>Facebook</MenuItem>
                                    <MenuItem value={'gdn'}>GDN</MenuItem>
                                    <MenuItem value={'google'}>Google</MenuItem>
                                    <MenuItem value={'guidedocs'}>Guidedocs</MenuItem>
                                    <MenuItem value={'healthyPlace'}>Healthy Place</MenuItem>
                                    <MenuItem value={'instagram'}>Instagram</MenuItem>
                                    <MenuItem value={'linkedIn'}>LinkedIn</MenuItem>
                                    <MenuItem value={'mediaMath'}>Media Math</MenuItem>
                                    <MenuItem value={'other'}>Other</MenuItem>
                                    <MenuItem value={'pinterest'}>Pinterest</MenuItem>
                                    <MenuItem value={'psychToday'}>Psych Today</MenuItem>
                                    <MenuItem value={'quora'}>Quora</MenuItem>
                                    <MenuItem value={'somethingFishy'}>Something Fishy</MenuItem>
                                    <MenuItem value={'tremor'}>Tremor</MenuItem>
                                    <MenuItem value={'yahoo'}>Yahoo</MenuItem>
                                    <MenuItem value={'yellowPages'}>Yellow Pages</MenuItem>
                                    <MenuItem value={'yelp'}>Yelp</MenuItem>
                                    <MenuItem value={'youtube'}>YouTube</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterCampaign">Campaign</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.campaign}
                                    onChange={this.handleSelect('campaign')}
                                    inputProps={{
                                        name: 'campaign',
                                        id: 'filterCampaign',
                                    }}
                                >
                                    <MenuItem value={'all'}>All</MenuItem>
                                    <MenuItem value={'alcohol'}>Alcohol</MenuItem>
                                    <MenuItem value={'amphetamine'}>Amphetamine</MenuItem>
                                    <MenuItem value={'cocaine'}>Cocaine</MenuItem>
                                    <MenuItem value={'opiate'}>Opiates</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterTier">Tier</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.tier}
                                    onChange={this.handleSelect('tier')}
                                    inputProps={{
                                        name: 'tier',
                                        id: 'filterTier',
                                    }}
                                >
                                    <MenuItem value={'all'}>All</MenuItem>
                                    <MenuItem value={'t1'}>T1</MenuItem>
                                    <MenuItem value={'t2'}>T2</MenuItem>
                                    <MenuItem value={'t3'}>T3</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterMedium">Medium</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.medium}
                                    onChange={this.handleSelect('medium')}
                                    inputProps={{
                                        name: 'medium',
                                        id: 'filterMedium',
                                    }}
                                >
                                    <MenuItem value={'all'}>All</MenuItem>
                                    <MenuItem value={'directories'}>Directories</MenuItem>
                                    <MenuItem value={'internalDirectories'}>Internal Directories</MenuItem>
                                    <MenuItem value={'leadGen'}>Lead Gen</MenuItem>
                                    <MenuItem value={'other'}>Other</MenuItem>
                                    <MenuItem value={'placement'}>Placement</MenuItem>
                                    <MenuItem value={'search'}>Search</MenuItem>
                                    <MenuItem value={'searchEngine'}>Search Engine</MenuItem>
                                    <MenuItem value={'signUp'}>Sign Up</MenuItem>
                                    <MenuItem value={'social'}>Social</MenuItem>
                                    <MenuItem value={'sponsorship'}>Sponsorship</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterDisorder">Disorder</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.disorder}
                                    onChange={this.handleSelect('disorder')}
                                    inputProps={{
                                        name: 'disorder',
                                        id: 'filterDisorder',
                                    }}
                                >
                                    <MenuItem value={'all'}>All</MenuItem>
                                    <MenuItem value={'alcohol'}>Alcohol</MenuItem>
                                </Select>
                            </FormControl>

                            <br/>
                            <h5 style={{
                                marginTop: '20px',
                                marginBottom: 0,
                                color: '#ff9800'
                            }}>
                                SKU
                            </h5>

                            <FormControl className="">
                                <InputLabel htmlFor="filterNetwork">Network</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.network}
                                    onChange={this.handleSelect('network')}
                                    inputProps={{
                                        name: 'network',
                                        id: 'filterNetwork',
                                    }}
                                >
                                    {Object.keys(skuCodes.Network).sort().map( key =>
                                        <MenuItem value={skuCodes.Network[key]} key={key}>{key}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterTargeting">Targeting</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.targetingMethod}
                                    onChange={this.handleSelect('targetingMethod')}
                                    inputProps={{
                                        name: 'targetingMethod',
                                        id: 'filterTargeting',
                                    }}
                                >
                                    {Object.keys(skuCodes.TargetingMethod).sort().map( key =>
                                        <MenuItem value={skuCodes.TargetingMethod[key]} key={key}>{key}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="filterFormat">Format</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.format}
                                    onChange={this.handleSelect('format')}
                                    inputProps={{
                                        name: 'format',
                                        id: 'filterFormat',
                                    }}
                                >
                                    {Object.keys(skuCodes.Format).sort().map( key =>
                                        <MenuItem value={skuCodes.Format[key]} key={key}>{key}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="filterMessage">Message</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.message}
                                    onChange={this.handleSelect('message')}
                                    inputProps={{
                                        name: 'message',
                                        id: 'filterMessage',
                                    }}
                                >
                                    {Object.keys(skuCodes.Message).sort().map( key =>
                                        <MenuItem value={skuCodes.Message[key]} key={key}>{key}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterAgeRange">Age Range</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.ageRange}
                                    onChange={this.handleSelect('ageRange')}
                                    inputProps={{
                                        name: 'ageRange',
                                        id: 'filterAgeRange',
                                    }}
                                >
                                    {Object.keys(skuCodes.AgeRange).sort().map( key =>
                                        <MenuItem value={skuCodes.AgeRange[key]} key={key}>{key}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterEthnicity">Ethnicity</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.ethnicity}
                                    onChange={this.handleSelect('ethnicity')}
                                    inputProps={{
                                        name: 'ethnicity',
                                        id: 'filterEthnicity',
                                    }}
                                >
                                    {Object.keys(skuCodes.Ethnicity).sort().map( key =>
                                        <MenuItem value={skuCodes.Ethnicity[key]} key={key}>{key}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterFamilyRole">Family Role</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.familyRole}
                                    onChange={this.handleSelect('familyRole')}
                                    inputProps={{
                                        name: 'familyRole',
                                        id: 'filterFamilyRole',
                                    }}
                                >
                                    {Object.keys(skuCodes.FamilyRole).sort().map( key =>
                                        <MenuItem value={skuCodes.FamilyRole[key]} key={key}>{key}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterGender">Gender</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.gender}
                                    onChange={this.handleSelect('gender')}
                                    inputProps={{
                                        name: 'gender',
                                        id: 'filterGender',
                                    }}
                                >
                                    {Object.keys(skuCodes.Gender).sort().map( key =>
                                        <MenuItem value={skuCodes.Gender[key]}  key={key}>{key}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterIncome">Income</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.income}
                                    onChange={this.handleSelect('income')}
                                    inputProps={{
                                        name: 'income',
                                        id: 'filterIncome',
                                    }}
                                >
                                    {Object.keys(skuCodes.Income).sort().map( key =>
                                        <MenuItem value={skuCodes.Income[key]} key={key}>{key}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterInterestsBehaviors">Interest/Behavior</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.interestsBehaviors}
                                    onChange={this.handleSelect('interestsBehaviors')}
                                    inputProps={{
                                        name: 'interestsBehaviors',
                                        id: 'filterInterestsBehaviors',
                                    }}
                                >
                                    {Object.keys(skuCodes.InterestsBehaviors).sort().map( key =>
                                        <MenuItem value={skuCodes.InterestsBehaviors[key]} key={key}>{key}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterLanguage">Language</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.language}
                                    onChange={this.handleSelect('language')}
                                    inputProps={{
                                        name: 'language',
                                        id: 'filterLanguage',
                                    }}
                                >
                                    {Object.keys(skuCodes.Language).sort().map( key =>
                                        <MenuItem value={skuCodes.Language[key]} key={key}>{key}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterEducation">Education</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.education}
                                    onChange={this.handleSelect('education')}
                                    inputProps={{
                                        name: 'education',
                                        id: 'filterEducation',
                                    }}
                                >
                                    {Object.keys(skuCodes.Education).sort().map( key =>
                                        <MenuItem value={skuCodes.Education[key]} key={key}>{key}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterOccupation">Occupation</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.occupation}
                                    onChange={this.handleSelect('occupation')}
                                    inputProps={{
                                        name: 'occupation',
                                        id: 'filterOccupation',
                                    }}
                                >
                                    {Object.keys(skuCodes.Occupation).sort().map( key =>
                                        <MenuItem value={skuCodes.Occupation[key]} key={key}>{key}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl className="">
                                <InputLabel htmlFor="filterRelationship">Relationship</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.relationship}
                                    onChange={this.handleSelect('relationship')}
                                    inputProps={{
                                        name: 'relationship',
                                        id: 'filterRelationship',
                                    }}
                                >
                                    {Object.keys(skuCodes.Relationship).sort().map( key =>
                                        <MenuItem value={skuCodes.Relationship[key]} key={key}>{key}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="filterReligion">Religion</InputLabel>
                                <Select
                                    className="skuFilterSelect"
                                    multiple
                                    value={this.state.Filter.religion}
                                    onChange={this.handleSelect('religion')}
                                    inputProps={{
                                        name: 'religion',
                                        id: 'filterReligion',
                                    }}
                                >
                                    {Object.keys(skuCodes.Religion).sort().map( key =>
                                        <MenuItem value={skuCodes.Religion[key]} key={key}>{key}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </form>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default DataFilter;