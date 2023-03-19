import React, { lazy, Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
//import CardMedia from '@material-ui/core/CardMedia';
//import CardContent from '@material-ui/core/CardContent';
//import CardActions from '@material-ui/core/CardActions';
//import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
//import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { loadImg } from '../../../Util/loadImg';
import { withRouter } from 'react-router-dom';
import { LAYOUT_URL } from '../../../../utils/constants';
import RegularSkeleton from '../Skeleton/RegularSkeleton';
import Helper from '../../../../utils/helper';

const Edit = lazy(() => import(/* webpackChunkName: 'iconEdit' */ "@material-ui/icons/Edit"));

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: props => props.maxWidth || 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: props => props.avatarBkg ? props.avatarBkg : red
    },
}));

function OrderCard(props) {
    const { logo, title, subheader, itemId } = props;
    const classes = useStyles(props);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const linkHandler = (item) => {
        props.history.push(`${LAYOUT_URL.SETTINGS_CUSTOMER_EDIT}?id=${itemId}`);
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="customer">
                        <img src={logo} alt="" />
                    </Avatar>
                }
                action={
                    !title
                        ? <RegularSkeleton />
                        : Helper.isShipperAdmin() ?
                            <span style={{ display: title ? '' : 'none' }}>
                                <IconButton aria-label="settings" onClick={() => linkHandler()}>
                                    <Suspense fallback="Loading..."><Edit style={{ fill: 'blue' }} /></Suspense>
                                </IconButton>
                            </span>
                            : null
                }
                title={<strong>{title}</strong>}
                subheader={<h6>{subheader}</h6>}
            />
            {/*
      <CardMedia
        className={classes.media}
        image={NoResult}
        title="Paella dish"
      />
      
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Company has a good rating
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>General Information:</Typography>
          <Typography paragraph>
            Here is where more details for the company
          </Typography>
        </CardContent>
      </Collapse>
        */}
        </Card>
    );
}
export default OrderCard;