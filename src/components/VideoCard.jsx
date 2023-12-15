import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  demoChannelTitle,
  demoChannelUrl,
  demoThumbnailUrl,
  demoVideoTitle,
  demoVideoUrl,
} from '../utils/constants';
import { CheckCircle } from '@mui/icons-material';

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
}) => {
  return (
    <Card
      sx={{
        boxShadow: 'none',
        borderRadius: 0,
      }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title}
          sx={{ aspectRatio: '16/9', objectFit: 'cover' }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: '#1e1e1e', height: '106px' }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="gray"
            sx={{ display: 'flex', alignItems: 'center' }}>
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
          </Typography>
          <Typography variant="subtitle2" color="gray" textAlign={'right'}>
            {snippet?.publishedAt.slice(0, 10)}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
