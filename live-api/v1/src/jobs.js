// Create a Standard Live Job

/**
 * @api {post} /v1/jobs Create a Live Job
 * @apiName Create a Live Job
 * @apiGroup Live_Jobs
 * @apiVersion 1.0.0
 *
 * @apiDescription Create a live stream
 *
 * @apiHeader {String} Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 * @apiParam (Request Body Fields) {Boolean} live_stream Indicates that the job is a live streaming job.
 * @apiParam (Request Body Fields) {Boolean} [ad_insertion=false] Setting this parameter to true will enable server side ad insertion (SSAI) on the job. Current support includes, DFP, Freewheel, or any VAST 2.0/3.0 ad tags.
 * @apiParam (Request Body Fields) {String="us-west-1", "us-west-2","us-east-1","us-east-2", "eu-west-1", "eu-west-2", "ap-southeast-2", "ap-northeast-1","ap-southeast-1", "eu-central-1", "sa-east-1", "ap-south-1"} region AWS region - you can also specify region as the alias for a list set up for the account by Brightcove Support.
 * @apiParam (Request Body Fields) {String} [beacon_set] ID for a beacon set (for SSAI only).
 * @apiParam (Request Body Fields) {Number{1-1800}} [reconnect_time=30] The time, in seconds, to wait for a stream to reconnect to the encoder. If the reconnect time passes without the stream reconnecting, the job will automatically finish.
 * @apiParam (Request Body Fields) {String} [slate] Id for a set of slate assets
 * @apiParam (Request Body Fields) {Boolean} [static=false] Whether this is a static entry point (SEP) job
 * @apiParam (Request Body Fields) {Object} [encryption] Encryption to apply to the stream.
 * @apiParam (Request Body Fields) {String="aes-128"} encryption.method The encryption method to use.
 * @apiParam (Request Body Fields) {String="internal","external"} encryption.type The encryption type, depending on whether an internal or external key server will be used.
 * @apiParam (Request Body Fields) {String} [encryption.key] The encryption key - either a `key` or a `passphrase` is required; if the `type` is `external`, `key` is required.
 * @apiParam (Request Body Fields) {String} [encryption.passphrase] The encryption key - either a `key` or a `passphrase` is required
 * @apiParam (Request Body Fields) {Boolean} [encryption.key_rotation=false] Whether to use key rotation
 * @apiParam (Request Body Fields) {Number} [encryption.rotate_every=10] Interval for key rotation in video segments
 * @apiParam (Request Body Fields) {String} [encryption.external_url] The URL for the external encryption key - this field is required if you specify `type` as `external`, and the external key must match the `key` value
 * @apiParam (Request Body Fields) {Number{0-93600}} [event_length=0] The minimum time, in seconds, to keep a live stream available. At any point within the specified event_length you may reconnect to your stream. The event_length setting goes into effect as soon as streaming begins.
 * @apiParam (Request Body Fields) {Number{1-7200}} [live_sliding_window_duration=100] The time, in seconds, to keep in the live DVR manifest. If the stream duration is longer than the window duration, segment references will be removed first in first out. Default is 100 seconds.
 * @apiParam (Request Body Fields) {Number{1-5}} [max_hls_protocol_version=3] Sets the maximum HLS protocol version to use. Special features will be used as available. Default is 3.
 * @apiParam (Request Body Fields) {Mixed[]} [notifications] Array of notification destination objects or strings - notifications defined here are for job-level events.  A notification will be sent to the destination when selected event occurs. You can use a simple string with a url: "http://log:pass@httpbin.org/post", or you can use an object.
 * @apiParam (Request Body Fields) {String} [notifications.event] Event to send the notification for.
 * @apiParam (Request Body Fields) {String} notifications.url Destination for the notification.
 * @apiParam (Request Body Fields) {String} [notifications.credentials] Credentials The name of the credentials configured in your account for this address
 * @apiParam (Request Body Fields) {String="first_segment_uploaded", "output_finished", "state_changed"} [notifications.event="state_changed"] Event type to send notifications for.  It is recommended to set events on the job and not individual rendition outputs since renditions will finish simultaneously.
 * @apiParam (Request Body Fields) {Object[]} [add_cdns] Array of additional CDN providers to be used for manifest generation. For each CDN provided, the manifest will be prepended accordingly
 * @apiParam (Request Body Fields) {String} add_cdns.label A label to identify the CDN.
 * @apiParam (Request Body Fields) {String} add_cdns.prepend CDN hostname to be prepended to addresses
 * @apiParam (Request Body Fields) {String="http","https"} add_cdns.protocol Protocol to use for the stream delivery
 * @apiParam (Request Body Fields) {String} add_cdns.vendor CDN vendor such as `akamai`
 * @apiParam (Request Body Fields) {Object} add_cdns.token_auth Token authentication details
 * @apiParam (Request Body Fields) {String} add_cdns.token_auth.auth_type Token authentication type - currently, the only supported value is `Akamai2.0`
 * @apiParam (Request Body Fields) {String} add_cdns.token_auth.key Your Akamai token auth password
 * @apiParam (Request Body Fields) {String{5..12}} add_cdns.token_auth.token_name Your Akamai token token name
 * @apiParam (Request Body Fields) {Object} add_cdns.token_auth.media Your Akamai token token name
 * @apiParam (Request Body Fields) {Mixed} [add_cdns.token_auth.media.start_time="now"] The time to apply token auth - `"now"` or epoch time in seconds
 * @apiParam (Request Body Fields) {Number} [add_cdns.token_auth.media.end_time] The time to end token auth, epoch time in seconds
 * @apiParam (Request Body Fields) {ttl} [add_cdns.token_auth.media.ttl] The time to live in seconds - either `end_time` or `ttl` is required
 * @apiParam (Request Body Fields) {Object[]} outputs Array of output specifications for live and VOD assets to be created from the live stream.
 * @apiParam (Request Body Fields) {String} outputs.label Label for the live or VOD asset.
 * @apiParam (Request Body Fields) {Boolean} outputs.live_stream For jobs, setting live_stream to true indicates the output is a live rendition. If `live_stream` is false, or is not set, the output will be treated as a VOD output.
 * @apiParam (Request Body Fields) {Number{0-172800}} [outputs.duration] Clipping API option 1. Duration (in seconds) to clip back from Live. Note: Clipping API only requires one of the three options for specifying duration or time.
 * @apiParam (Request Body Fields) {Number{0-2147483647}} [outputs.stream_start_time] Clipping API option 2. An offset, in seconds, from the start of the live stream to mark the beginning of the clip. Note: Clipping API only requires one of the three options for specifying duration or time.
 * @apiParam (Request Body Fields) {Number{stream_start_time-stream_start_time+172800}} [outputs.stream_end_time] Clipping API option 2. An offset, in seconds, from the start of the live stream to mark the end of the clip. Note: Clipping API only requires one of the three options for specifying duration or time.
 * @apiParam (Request Body Fields) {Number{current_time-future_time}} [outputs.start_time] Clipping API option 3. Universal epoch time, in seconds, to mark the beginning of the clip. Note: Clipping API only requires one of the three options for specifying duration or time.
 * @apiParam (Request Body Fields) {Number{start_time-start_time+172800}} [outputs.end_time] Clipping API option 3. Universal epoch time, in seconds, to mark the end of the clip. Note: Clipping API only requires one of the three options for specifying duration or time.
 * @apiParam (Request Body Fields) {Boolean} [outputs.copy_video] Specifying `copy_video` will take the video track from the input video file and transmux it into the resulting output file.
 * @apiParam (Request Body Fields) {Boolean} [outputs.copy_audio] Specifying `copy_audio` will take the audio track from the input video file and transmux it into the resulting output file.
 * @apiParam (Request Body Fields) {Boolean} [outputs.skip_video] Specifying `skip_video` removes the video track.
 * @apiParam (Request Body Fields) {Boolean} [outputs.skip_audio] Specifying `skip_audio` removes the audio track.
 * @apiParam (Request Body Fields) {Number} [outputs.width] Video frame width. If no width is supplied, we will use the original width, or scale to size of height setting.
 * @apiParam (Request Body Fields) {Number} [outputs.height] Video frame height. If no height is supplied, we will use the original height, or scale to size or width setting.
 * @apiParam (Request Body Fields) {String="h264"} [outputs.video_codec] The output video codec. Note: Only h264 is supported.
 * @apiParam (Request Body Fields) {String="baseline","main","high"} [outputs.h264_profile] H.264 has three commonly-used profiles: Baseline (lowest), Main, and High. Lower levels are easier to decode, but higher levels offer better compression. For the best compression quality, choose High. For playback on low-CPU machines or many mobile devices, choose Baseline.
 * @apiParam (Request Body Fields) {Number{1-6000}} outputs.keyframe_interval The maximum number of frames between each keyframe. If you set a low keyframe_interval it will increase the size / decrease the quality of your output file, but it will allow more precise scrubbing in most players. It’s recommended to have at least one keyframe per segment. If keyframe_interval is not provided, keyframes will follow the input GOP structure.
 * @apiParam (Request Body Fields) {Number{64-10000}} outputs.video_bitrate target video bitrate in kbps
 * @apiParam (Request Body Fields) {String="aac"} [outputs.audio_codec] The output audio codec to use. Note: Only aac is supported.
 * @apiParam (Request Body Fields) {Number{16-1024}} outputs.audio_bitrate An output bitrate setting for the audio track, in Kbps
 * @apiParam (Request Body Fields) {Number{1-20}} outputs.segment_seconds Sets the maximum duration of each segment in a segmented output.
 * @apiParam (Request Body Fields) {mixed[]} [outputs.notifications] Array of notification destination objects or strings - notifications defined here are for events specific to the output.  A notification will be sent to the destination when selected event occurs. You can use a simple string with a url: "http://log:pass@httpbin.org/post", or you can use an object.
 * @apiParam (Request Body Fields) {String} outputs.notifications.url Destination for the notification.
 * @apiParam (Request Body Fields) {String} [outputs.notifications.event] Event to send the notification for.
 * @apiParam (Request Body Fields) {String} [outputs.notifications.credentials] Credentials The name of the credentials configured in your account for this address
 * @apiParam (Request Body Fields) {String} [outputs.rendition_label] Indicates what rendition to use to create a VOD output (from the live job) or which renditions to use. By default, the system uses any transmuxed rendition or the highest resolution output if there is no transmuxed output.
 * @apiParam (Request Body Fields) {String="playlist"} [outputs.type] The only type supported is a playlist. This is used for generating multiple master playlists with different renditions in the HLS manifest with the defined stream labels.
 * @apiParam (Request Body Fields) {Array} [outputs.streams] When creating a playlist, the streams field is used to define which output renditions (by label) should be included in the manifest. Example format [{"source": "1080p"}, {"source": "720p"}].
 * @apiParam (Request Body Fields) {String} [outputs.url] For VOD, URL is mandatory and sets the destination of the final asset destination. For access restricted origins, the credentials a can be passed along with the URL or stored within the Brightcove system. For Live, this is reserved for future use.
 * @apiParam (Request Body Fields) {String} [outputs.credentials] The name for credentials with private and public keys can be stored with Brightcove to avoid passing plain text on API requests. This is required if the S3 or FTP origins are restricted. If credentials are not provided, it will be assumed that the origin restrictions are set to public or credentials are passed along with the URL.
 * @apiParam (Request Body Fields) {Object} [outputs.videocloud] Video Cloud customer have the option to push their clips directly through Dynamic Ingest. Options "{"video": {"name"}, "ingest": { }". The video object will be sent to the CMS API and can include (description, tags, etc.). Note: the account_id and reference_id will be added automatically. If overriding the reference_id, ensure that the id does not already exist or the job will fail. For more information see: [CMS-API-CreateVideo](https://brightcovelearning.github.io/Brightcove-API-References/cms-api/v1/doc/index.html#api-videoGroup-Create_Video). The ingest object will be sent to the Dynamic Ingest API and can include (master, profile, poster, callbacks, etc). Note: the account_id and video_id are added automatically. For more information see: [DI-API-IngestVideo](https://brightcovelearning.github.io/Brightcove-API-References/dynamic-ingest-api/v1/doc/index.html#api-Ingest-Ingest_Media_Asset).
 * @apiParam (Request Body Fields) {Mixed[]} [outputs.notifications] Array of notification destination objects or strings.  A notification will be sent to the destination when selected event occurs. You can use a simple string with a url: "http://log:pass@httpbin.org/post", or you can use an object.
 * @apiParam (Request Body Fields) {String} [outputs.notifications.event] Event to send the notification for.
 * @apiParam (Request Body Fields) {String} outputs.notifications.url Destination for the notification.
 *
 * @apiParamExample {json} Standard Live Stream Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 20,
 *        "live_sliding_window_duration": 30,
 *        "outputs": [
 *            {
 *                "label": "hls720p",
 *                "live_stream": true,
 *                "width": 960,
 *                "height": 540,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            },
 *            {
 *                "label": "hls480p",
 *                "live_stream": true,
 *                "width": 640,
 *                "height": 360,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 819,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            }
 *        ]
 *    }
 *
 * @apiParamExample {json} Live Stream Custom Origin Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 30,
 *        "outputs": [
 *            {
 *                "label": "hls720p",
 *                "live_stream": true,
 *                "width": 960,
 *                "height": 540,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            },
 *            {
 *                "label": "hls480p",
 *                "live_stream": true,
 *                "width": 640,
 *                "height": 360,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 819,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            },
 *            {
 *                "type":"playlist",
 *                "url":"s3://YOUR_BUCKET/custom/playlist.m3u8",
 *                "credentials":"YOUR_CREDENTIALS",
 *                "streams": [{"source": "hls480p"},{"source": "hls720p"}]
 *            }
 *        ]
 *    }
 *
 * @apiParamExample {json} Live Stream Transmuxed Rendition Example:
 *     // When using a transmuxed rendition within a multi-bitrate HLS output,
 *     // the segment_size and keyframe_interval should be avoided on any of the outputs
 *     // to ensure segments and keyframes follow the input GOP structure.
 *     //If not, the system will return an error in the job creation request.
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list,
 *        "reconnect_time": 20,
 *        "outputs": [
 *            {
 *                "label": "hls1080p transmux",
 *                "live_stream": true,
 *                "copy_video": true,
 *                "copy_audio": true,
 *                "segment_seconds": 6
 *            },
 *            {
 *                "label": "hls720p",
 *                "live_stream": true,
 *                "width": 960,
 *                "height": 540,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6
 *            },
 *            {
 *                "label": "hls480p",
 *                "live_stream": true,
 *                "width": 640,
 *                "height": 360,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 819,
 *                "segment_seconds": 6
 *            },
 *            {
 *                "url":"s3://YOUR_BUCKET/live/20160403004644_test.mp4",
 *                "credentials": "YOUR_CREDENTIALS"
 *            }
 *        ]
 *    }
 *
 * @apiParamExample {json} Live Stream with VOD Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 20,
 *        "live_sliding_window_duration":30,
 *        "outputs": [
 *            {
 *                "label": "hls720p",
 *                "live_stream": true,
 *                "width": 960,
 *                "height": 540,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6
 *            },
 *            {
 *                "url":"s3://YOUR_BUCKET/live/20160403004644_test.mp4",
 *                "credentials": "YOUR_CREDENTIALS"
 *            }
 *        ]
 *    }
 *
 * @apiParamExample {json} Live Stream with VOD and Notifications Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 20,
 *        "notifications": [
 *            "http://httpbin.org/post?liveStateChange",
 *            {
 *                "url": "http://httpbin.org/post?liveStarted",
 *                "event": "first_segment_uploaded"
 *            },
 *            {
 *                "url": "http://httpbin.org/post?liveFinished",
 *                "event": "output_finished"
 *            }],
 *        "outputs": [
 *        {
 *            "label": "hls720p",
 *            "live_stream": true,
 *            "height": 720,
 *            "video_bitrate": 2000,
 *            "segment_seconds": 6,
 *            "video_codec": "h264",
 *            "h264_profile": "high",
 *            "segment_seconds": 6
 *        },
 *        {
 *            "label": "hls360p",
 *            "live_stream": true,
 *            "height": 360,
 *            "video_bitrate": 650,
 *            "segment_seconds": 6
 *        },
 *        {
 *            "url":"s3://YOUR_BUCKET/path/filename.mp4",
 *            "credentials": "YOUR_CREDENTIALS",
 *            "notifications":    [{
 *                "url": "http://httpbin.org/post?vodStateChange"
 *            },
 *            {
 *                "url": "http://httpbin.org/post?vodFinished",
 *                "event": "output_finished"
 *            }]
 *        }]
 *    }
 *
 * @apiParamExample {json} Live Stream with Multiple Output Playlists Example:
 *   {
 *       "live_stream": true,
 *       "region": "my-region-list",
 *       "reconnect_time": 180,
 *       "outputs": [{
 *           "label": "hls1080p",
 *           "live_stream": true,
 *           "height": 1080,
 *           "video_bitrate": 3000,
 *           "segment_seconds": 6,
 *           "keyframe_interval": 90
 *       },{
 *           "label": "hls720p",
 *           "live_stream": true,
 *           "height": 720,
 *           "video_bitrate": 2000,
 *           "segment_seconds": 6,
 *           "keyframe_interval": 90
 *       },{
 *           "label": "AudioOnly",
 *           "live_stream": true,
 *           "skip_video": true
 *       },{
 *           "label": "playlistVideoALL",
 *           "type": "playlist",
 *           "streams": [{"source": "hls1080p"},{"source": "hls720p"}]
 *       },{
 *           "label": "playlistHIGH",
 *           "type": "playlist",
 *           "filename":"playlist-high.m3u8",
 *           "streams": [{"source": "hls1080p"}]
 *       },{
 *           "label": "playlistAudio",
 *           "type": "playlist",
 *           "filename":"playlist-audio.m3u8",
 *           "streams": [{"source": "AudioOnly"}]
 *       },{
 *           "url":"s3://YOUR_BUCKET/PATH/20160804104116_test.mp4",
 *           "credentials": "S3_CREDENTIALS"
 *       }]
 *    }
 *
 * @apiParamExample {json} Live Stream with a Multiple CDN Config Example:
 *     // When using your own FTP or S3 origin location,
 *     // your CDN must be configured to fallback to your origin location.
 *     // The Brightcove Live system will not validate that the origin locations
 *     // for the CDN’s provided in the job request.
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 30,
 *        "add_cdns":[
 *            {
 *                "label": "akamai",
 *                "prepend": "akamai.playback.com/someApplication",
 *                "protocol": "http"
 *            },
 *            {
 *                "label": "level3_1",
 *                "prepend": "l3.playback.io/somPath/someApplication/someFolder",
 *                "protocol": "http"
 *            }
 *        ],
 *        "outputs": [
 *            {
 *                "label": "hls1",
 *                "live_stream": true,
 *                "width": 960,
 *                "height": 540,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            },
 *            {
 *                "label": "hls2",
 *                "live_stream": true,
 *                "width": 640,
 *                "height": 360,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 819,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            }
 *        ]
 *    }
 *
 *
 *
 * @apiParamExample {json} Live Stream with SSAI and VOD output Example:
 *    {
 *            "ad_insertion": true,
 *            "live_stream": true,
 *            "region": "my-region-list,
 *            "reconnect_time": 180,
 *            "slate": "bbbff5ad67a94941be8cb987ba23049d",
 *            "notifications": [
 *                "http://httpbin.org/post"
 *            ],
 *            "add_cdns":[{
 *                "label": "akamai-test",
 *                "prepend": "vrnginx-useast.akamai.com",
 *                "protocol": "http"
 *            }],
 *            "outputs": [
 *                {
 *                    "label": "hls720p",
 *                    "live_stream": true,
 *                    "height": 720,
 *                    "video_bitrate": 2400,
 *                    "segment_seconds": 6,
 *                    "keyframe_interval": 90
 *                },{
 *                    "label": "hls480p",
 *                    "live_stream": true,
 *                    "height": 480,
 *                    "video_bitrate": 1000,
 *                    "segment_seconds": 6,
 *                    "keyframe_interval": 90
 *                }, {
 *                "url":"s3://YOUR_BUCKET/live/20160403004644_test.mp4",
 *                "credentials": "YOUR_CREDENTIALS"
 *            }]
 *    }
 *
 * @apiParamExample {json} Standard Live Stream with Internal Encryption Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 20,
 *        "live_sliding_window_duration": 30,
 *        "encryption": {
 *            "method": "aes-128",
 *            "type": "internal",
 *            "key":"01234567890123450123456789012345"
 *        }
 *        "outputs": [
 *            {
 *                "label": "hls720p",
 *                "live_stream": true,
 *                "width": 960,
 *                "height": 540,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            },
 *            {
 *                "label": "hls480p",
 *                "live_stream": true,
 *                "width": 640,
 *                "height": 360,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 819,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            }
 *        ]
 *    }
 *
 * @apiParamExample {json} Standard Live Stream with Internal Encryption and Passphrase Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 20,
 *        "live_sliding_window_duration": 30,
 *        "encryption": {
 *            "method": "aes-128",
 *            "type": "internal",
 *            "passphrase": "SuperSecret
 *        }
 *        "outputs": [
 *            {
 *                "label": "hls720p",
 *                "live_stream": true,
 *                "width": 960,
 *                "height": 540,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            },
 *            {
 *                "label": "hls480p",
 *                "live_stream": true,
 *                "width": 640,
 *                "height": 360,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 819,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            }
 *        ]
 *    }
 *
 * @apiParamExample {json} Standard Live Stream with Internal Encryption and Rotation Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 20,
 *        "live_sliding_window_duration": 30,
 *        "encryption": {
 *            "method": "aes-128",
 *            "type": "internal",
 *            "rotate_every": 5,
 *            "key_rotation": true,
 *        }
 *        "outputs": [
 *            {
 *                "label": "hls720p",
 *                "live_stream": true,
 *                "width": 960,
 *                "height": 540,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            },
 *            {
 *                "label": "hls480p",
 *                "live_stream": true,
 *                "width": 640,
 *                "height": 360,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 819,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            }
 *        ]
 *    }
 *
 * @apiParamExample {json} Standard Live Stream with External URL and Key Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 20,
 *        "live_sliding_window_duration": 30,
 *        "encryption": {
 *            "method": "aes-128",
 *            "type": "external",
 *            "key": "01234567890123456789012345678901",
 *            "external_url": "https://myserver/mykey/a.key"
 *        }
 *        "outputs": [
 *            {
 *                "label": "hls720p",
 *                "live_stream": true,
 *                "width": 960,
 *                "height": 540,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            },
 *            {
 *                "label": "hls480p",
 *                "live_stream": true,
 *                "width": 640,
 *                "height": 360,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 819,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            }
 *        ]
 *    }
 *
 *
 * @apiSuccess (Response Fields) {String} id Id for the stream.
 * @apiSuccess (Response Fields) {Object[]} outputs Details on each output rendition of the Live job.
 * @apiSuccess (Response Fields) {String} outputs.id The unique id for the rendition.
 * @apiSuccess (Response Fields) {String} outputs.playback_url Media HLS manifest for the specified rendition (non-SSAI).
 * @apiSuccess (Response Fields) {String} outputs.playback_url_dvr Media HLS manifest with a configurable DVR window. Default 100 seconds (non-SSAI).
 * @apiSuccess (Response Fields) {String} outputs.playback_url_vod Media HLS manifest of the Live stream for the last 24 hours. (non-SSAI).
 * @apiSuccess (Response Fields) {Boolean} live_stream Indicates that the job is a live streaming job.
 * @apiSuccess (Response Fields) {Boolean} ad_insertion Setting this parameter to true will enable server side ad insertion (SSAI) on the job. Current support includes, DFP, Freewheel, or any VAST 2.0/3.0 ad tags.
 * @apiSuccess (Response Fields) {String} region You can specify an Amazon AWS region to use for encoding a job and we will process the job on servers in the region specified. It’s recommended to use the region closest to your encoder.
 * @apiSuccess (Response Fields) {Number} reconnect_time The time, in seconds, to wait for a stream to reconnect to the encoder. Default is set to 30 seconds.
 * @apiSuccess (Response Fields) {Number} event_length The minimum time, in seconds, to keep a live stream available. At any point within the specified event_length you may reconnect to your stream. The event_length setting goes into effect as soon as streaming begins.
 * @apiSuccess (Response Fields) {Number} live_sliding_window_duration The time, in seconds, to keep in the live DVR manifest. If the stream duration is longer than the window duration, segment references will be removed first in first out. Default is 100 seconds.
 * @apiSuccess (Response Fields) {Number} max_hls_protocol_version Sets the maximum HLS protocol version to use. Special features will be used as available. Default is 3.
 * @apiSuccess (Response Fields) {String} slate id for slate of assets to be included
 * @apiSuccess (Response Fields) {mixed[]} notifications Array of notification destination objects or strings.  A notification will be sent to the destination when selected event occurs. You can use a simple string with a url: "http://log:pass@httpbin.org/post", or you can use an object.
 * @apiSuccess (Response Fields) {String} notifications.url Destination for the notification.
 * @apiSuccess (Response Fields) {String} notifications.credentials Credentials for the destination, if required.
 * @apiSuccess (Response Fields) {String} notifications.event Event type to send notifications for.  It’s recommended to set events on the job and not individual rendition outputs since renditions will finish simultaneously.
 * @apiSuccess (Response Fields) {Object[]} add_cdns Array of additional CDN providers to be used for manifest generation. For each CDN provided, the manifest will be prepended accordingly
 * @apiSuccess (Response Fields) {String} add_cdns.label A label to identify the CDN.
 * @apiSuccess (Response Fields) {String} add_cdns.prepend Typically, a domain or path to prepend to addresses
 * @apiSuccess (Response Fields) {String} add_cdns.protocol Protocol to use in sending the stream to the CDN.
 *
 * @apiSuccessExample {json} Success Response Standard Live Stream:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": "edb92295e0f744f088f473ac047538c3",
 *      "outputs": [
 *        {
 *          "id": "0-edb92295e0f744f088f473ac047538c3",
 *          "playback_url": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/profile_0/chunklist.m3u8",
 *          "playback_url_dvr": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/profile_0/chunklist_dvr.m3u8",
 *          "playback_url_vod": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/profile_0/chunklist_vod.m3u8",
 *          "label": "hls720p"
 *        },
 *        {
 *          "id": "1-edb92295e0f744f088f473ac047538c3",
 *          "playback_url": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/profile_1/chunklist.m3u8",
 *          "playback_url_dvr": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/profile_1/chunklist_dvr.m3u8",
 *          "playback_url_vod": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/profile_1/chunklist_vod.m3u8",
 *          "label": "hls480p"
 *        },
 *        {
 *          "id": "2-edb92295e0f744f088f473ac047538c3",
 *          "playlist_type": "defaultS3",
 *          "type": "playlist",
 *          "filename": "playlist.m3u8",
 *          "dvr_filename": "playlist_dvr.m3u8",
 *          "playback_url": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/playlist.m3u8",
 *          "playback_url_dvr": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/playlist_dvr.m3u8"
 *        }
 *      ],
 *      "stream_url": "rtmp://ep4-usw2.bcovlive.io:1935/edb92295e0f744f088f473ac047538c3",
 *      "stream_name": "alive",
 *      "playback_url": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/playlist.m3u8",
 *      "playback_url_dvr": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/playlist_dvr.m3u8"
 *    }
 *
 * @apiSuccessExample {json} Success Response Live Stream with Multiple Output Playlists:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": "edcd4d356228417d80345a0c91864efe",
 *      "outputs": [
 *        {
 *          "id": "0-edcd4d356228417d80345a0c91864efe",
 *          "label": "hls1080p"
 *        },
 *        {
 *          "id": "1-edcd4d356228417d80345a0c91864efe",
 *          "label": "hls720p"
 *        },
 *        {
 *          "id": "2-edcd4d356228417d80345a0c91864efe",
 *          "label": "AudioOnly"
 *        },
 *        {
 *          "id": "3-edcd4d356228417d80345a0c91864efe",
 *          "playlist_type": "defaultS3",
 *          "type": "playlist",
 *          "label": "playlistVideoALL",
 *          "filename": "8b31bafdb20d462ea2e6e336a67ed4f3.m3u8",
 *          "dvr_filename": "8b31bafdb20d462ea2e6e336a67ed4f3_dvr.m3u8",
 *          "streams": [
 *            "hls1080p",
 *            "hls720p"
 *          ],
 *          "playback_url": "http://playback.bcovlive.io/edcd4d356228417d80345a0c91864efe/us-west-2/8b31bafdb20d462ea2e6e336a67ed4f3.m3u8",
 *          "playback_url_dvr": "http://playback.bcovlive.io/edcd4d356228417d80345a0c91864efe/us-west-2/8b31bafdb20d462ea2e6e336a67ed4f3_dvr.m3u8",
 *          "playback_url_s3": "s3://BUCKET/edcd4d356228417d80345a0c91864efe/us-west-2/8b31bafdb20d462ea2e6e336a67ed4f3.m3u8"
 *        },
 *        {
 *          "id": "4-edcd4d356228417d80345a0c91864efe",
 *          "playlist_type": "defaultS3",
 *          "type": "playlist",
 *          "label": "playlistHIGH",
 *          "filename": "playlist-high.m3u8",
 *          "dvr_filename": "playlist-high_dvr.m3u8",
 *          "streams": [
 *            "hls1080p"
 *          ],
 *          "playback_url": "http://playback.bcovlive.io/edcd4d356228417d80345a0c91864efe/us-west-2/playlist-high.m3u8",
 *          "playback_url_dvr": "http://playback.bcovlive.io/edcd4d356228417d80345a0c91864efe/us-west-2/playlist-high_dvr.m3u8",
 *          "playback_url_s3": "s3://BUCKET/edcd4d356228417d80345a0c91864efe/us-west-2/playlist-high.m3u8"
 *        },
 *        {
 *          "id": "5-edcd4d356228417d80345a0c91864efe",
 *          "playlist_type": "defaultS3",
 *          "type": "playlist",
 *          "label": "playlistAudio",
 *          "filename": "playlist-audio.m3u8",
 *          "dvr_filename": "playlist-audio_dvr.m3u8",
 *          "streams": [
 *            "AudioOnly"
 *          ],
 *          "playback_url": "http://playback.bcovlive.io/edcd4d356228417d80345a0c91864efe/us-west-2/playlist-audio.m3u8",
 *          "playback_url_dvr": "http://playback.bcovlive.io/edcd4d356228417d80345a0c91864efe/us-west-2/playlist-audio_dvr.m3u8",
 *          "playback_url_s3": "s3://BUCKET/edcd4d356228417d80345a0c91864efe/us-west-2/playlist-audio.m3u8"
 *        }
 *      ],
 *      "stream_url": "rtmp://host/edcd4d356228417d80345a0c91864efe",
 *      "stream_name": "alive",
 *      "playback_url": "http://playback.bcovlive.io/edcd4d356228417d80345a0c91864efe/us-west-2/8b31bafdb20d462ea2e6e336a67ed4f3.m3u8",
 *      "playback_url_dvr": "http://playback.bcovlive.io/edcd4d356228417d80345a0c91864efe/us-west-2/8b31bafdb20d462ea2e6e336a67ed4f3_dvr.m3u8",
 *      "playback_url_s3": "s3://BUCKET/edcd4d356228417d80345a0c91864efe/us-west-2/8b31bafdb20d462ea2e6e336a67ed4f3.m3u8",
 *    }
 *
 * @apiSuccessExample {json} Success Response Live Stream with a Multiple CDN Config:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": "b3c20e416f964fb1b67334877bade99b",
 *      "outputs": [
 *        {
 *          "id": "0b3c20e416f964fb1b67334877bade99b",
 *          "playback_url": "http://playback.bcovlive.io/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist.m3u8",
 *          "playback_url_dvr": "http://playback.bcovlive.io/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_dvr.m3u8",
 *          "playback_url_vod": "http://playback.bcovlive.io/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_vod.m3u8",
 *          "playback_added_cdns": [
 *            {
 *              "label": "akamai",
 *              "playback_url": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist.m3u8",
 *              "playback_url_dvr": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_dvr.m3u8",
 *              "playback_url_vod": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_vod.m3u8"
 *            },
 *            {
 *              "label": "level3_1",
 *              "playback_url": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist.m3u8",
 *              "playback_url_dvr": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_dvr.m3u8",
 *              "playback_url_vod": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_vod.m3u8"
 *            }
 *          ],
 *          "label": "hls1"
 *        },
 *        {
 *          "id": "1b3c20e416f964fb1b67334877bade99b",
 *          "playback_url": "http://playback.bcovlive.io/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist.m3u8",
 *          "playback_url_dvr": "http://playback.bcovlive.io/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist_dvr.m3u8",
 *          "playback_url_vod": "http://playback.bcovlive.io/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist_vod.m3u8",
 *          "playback_added_cdns": [
 *            {
 *              "label": "akamai",
 *              "playback_url": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist.m3u8",
 *              "playback_url_dvr": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist_dvr.m3u8",
 *              "playback_url_vod": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist_vod.m3u8"
 *            },
 *            {
 *              "label": "level3_1",
 *              "playback_url": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist.m3u8",
 *              "playback_url_dvr": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist_dvr.m3u8",
 *              "playback_url_vod": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist_vod.m3u8"
 *            }
 *          ],
 *          "label": "hls2"
 *        }
 *      ],
 *      "stream_url": "rtmp://ep16-usw2.a-live.io:1935/b3c20e416f964fb1b67334877bade99b",
 *      "stream_name": "alive",
 *      "playback_url": "http://playback.bcovlive.io/b3c20e416f964fb1b67334877bade99b/us-west-2/playlist.m3u8",
 *      "playback_url_dvr": "http://playback.bcovlive.io/b3c20e416f964fb1b67334877bade99b/us-west-2/playlist_dvr.m3u8",
 *      "playback_url_vod": "http://playback.bcovlive.io/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_vod.m3u8",
 *      "playback_added_cdns": [
 *        {
 *          "label": "akamai",
 *          "playback_url": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/playlist.m3u8",
 *          "playback_url_dvr": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/playlist_dvr.m3u8",
 *          "playback_url_vod": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_vod.m3u8"
 *        },
 *        {
 *          "label": "level3_1",
 *          "playback_url": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/playlist.m3u8",
 *          "playback_url_dvr": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/playlist_dvr.m3u8",
 *          "playback_url_vod": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_vod.m3u8"
 *        }
 *      ]
 *    }
 *
 *
 * @apiSuccessExample {json} Success Response Live Stream with SSAI and VOD output:
 *    HTTP/1.1 200 OK
 *    {
 *       "id": "3158f1c9bc5c462182079f434ba4ae0a",
 *       "outputs": [
 *          {
 *             "id": "03158f1c9bc5c462182079f434ba4ae0a",
 *             "playback_url":"http://host/jobId/us-west-2/profile_0/chunklist.m3u8",
 *             "Playback_url_dvr": "http://host/jobId/us-west-2/profile_0/chunklist_dvr.m3u8",
 *             "playback_url_vod": "http://host/jobId/us-west-2/profile_0/chunklist_vod.m3u8",
 *             "label": "Out0"
 *          },
 *          {
 *             "id": "13158f1c9bc5c462182079f434ba4ae0a",
 *             "playback_url": "http://host/jobId/us-west-2/profile_1/chunklist.m3u8",
 *             "playback_url_dvr": "http://host/jobId/us-west-2/profile_1/chunklist_dvr.m3u8",
 *             "playback_url_vod": "http://host/jobId/us-west-2/profile_1/chunklist_vod.m3u8",
 *             "label": "Out1"
 *          },
 *          {
 *             "id": "23158f1c9bc5c462182079f434ba4ae0a",
 *             "playback_url": "http://host/jobId/us-west-2/profile_2/chunklist.m3u8",
 *             "playback_url_dvr": "http://host/jobId/us-west-2/profile_2/chunklist_dvr.m3u8",
 *             "playback_url_vod": "http://host/jobId/us-west-2/profile_2/chunklist_vod.m3u8",
 *             "label": "Out2"
 *          }
 *       ],
 *       "stream_url": "rtmp://ep6-usw2.a-live.io:1935/3158f1c9bc5c462182079f434ba4ae0a",
 *       "stream_name": "alive",
 *       "playback_url": "http://host/jobId/us-west-2/playlist.m3u8",
 *       "playback_url_dvr": "http://host/jobId/us-west-2/playlist_dvr.m3u8"
 *    }
 *
 * @apiError (Error 4xx) {json} BAD REQUEST 400: Invalid region - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (Error 4xx) {json} BAD REQUEST 400: Invalid input value - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (Error 4xx) {json} BAD REQUEST 400: The notification target type is not supported currently - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (Error 5xx) {json} INTERNAL SERVER ERROR 500: After filtering, there is no job to process - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 * @apiErrorExample {json} 404 Error Response
 *    HTTP/1.1 404 Not Found
 *    {
 *        "error_code": "NOT_FOUND",
 *        "message": "Requested resource does not exist",
 *        "request_id": "df35af83-ac9b-44b0-b172-a80a11bd0bfa"
 *    }
 *
 *
 */

 // Stop Live Job

 /**
  * @api {put} /v1/jobs/:jobId/cancel Stop Live Job
  * @apiName Stop Live Job
  * @apiGroup Live_Jobs
  * @apiVersion 1.0.0
  *
  * @apiDescription Stop a live stream
  *
  * @apiHeader {String} Content-Type: application/json
  * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
  *
  * @apiParam (URL Parameters) {String} jobId The job id for the stream you want to stop.
  *
  * @apiParamExample {url} Live Stream Custom Origin Example:
  *     https://api.bcovlive.io/v1/jobs/3158f1c9bc5c462182079f434ba4ae0a/cancel
  *
  * @apiSuccess (Response Fields) {String} id The job id for the stream that was stopped
  *
  * @apiSuccessExample {json} Success Response Stop a Live Stream:
  *    HTTP/1.1 200 OK
  *    {
  *        "id": "3158f1c9bc5c462182079f434ba4ae0a"
  *    }
  *
  * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 5xx) {json} INTERNAL SERVER ERROR 500: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 5xx) {json} INTERNAL SERVER ERROR 500: After filtering, there is no job to process - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  *
  */

 // Activate SEP Stream

 /**
  * @api {put} /v1/jobs/:jobId/activate Activate SEP Stream
  * @apiName Activate SEP Stream
  * @apiGroup Live_Jobs
  * @apiVersion 1.0.0
  *
  * @apiDescription Activate SEP (static entry point) Stream
  *
  * @apiHeader {String} Content-Type: application/json
  * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
  *
  * @apiParam (URL Parameters) {String} jobId The job id for the stream you want to activate.
  *
  * @apiParamExample {url} Activate SEP Job Example:
  *     https://api.bcovlive.io/v1/jobs/3158f1c9bc5c462182079f434ba4ae0a/activate
  *
  * @apiSuccess (Response Fields) {String} id The job id for the stream that was activated
  *
  * @apiSuccessExample {json} Success Response Stop a Live Stream:
  *    HTTP/1.1 200 OK
  *    {
  *        "id": "3158f1c9bc5c462182079f434ba4ae0a"
  *    }
  *
  * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 5xx) {json} INTERNAL SERVER ERROR 500: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  *
  */

 // Deactivate SEP Stream

 /**
  * @api {put} /v1/jobs/:jobId/deactivate Deactivate SEP Stream
  * @apiName Deactivate SEP Stream
  * @apiGroup Live_Jobs
  * @apiVersion 1.0.0
  *
  * @apiDescription Deactivate SEP (static entry point) Stream
  *
  * @apiHeader {String} Content-Type: application/json
  * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
  *
  * @apiParam (URL Parameters) {String} jobId The job id for the stream you want to deactivate.
  *
  * @apiParamExample {url} Deactivate SEP Job Example:
  *     https://api.bcovlive.io/v1/jobs/3158f1c9bc5c462182079f434ba4ae0a/deactivate
  *
  * @apiSuccess (Response Fields) {String} id The job id for the stream that was Deactivated
  *
  * @apiSuccessExample {json} Success Response Stop a Live Stream:
  *    HTTP/1.1 200 OK
  *    {
  *        "id": "3158f1c9bc5c462182079f434ba4ae0a"
  *    }
  *
  * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 5xx) {json} INTERNAL SERVER ERROR 500: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  *
  */

// Get Live Jobs

 /**
  * @api {get} /v1/ui/jobs/live Get Live Jobs
  * @apiName Get Live Jobs
  * @apiGroup Live_Jobs
  * @apiVersion 1.0.0
  *
  * @apiDescription Get all current live jobs
  *
  * @apiHeader {String} Content-Type: application/json
  * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
  *
  * @apiParam (URL Parameters) {String} jobId The job id you want details for.
  *
  * @apiParamExample {url} Live Stream Custom Origin Example:
  *     https://api.bcovlive.io/v1/jobs/3158f1c9bc5c462182079f434ba4ae0a
  *
  * @apiSuccess (Response Fields) {String} lastevaluatedkey `TODO`
  * @apiSuccess (Response Fields) {Object[]} jobs Array of `job` objects - remaining entries are the job detail fields
  * @apiSuccess (Response Fields) {Object} job Object containing the job details
  * @apiSuccess (Response Fields) {DateTimeString} job.created_at ISO 8601 date-time string representing when the job was created
  * @apiSuccess (Response Fields) {DateTimeString} job.finished_at ISO 8601 date-time string representing when the live stream was stopped
  * @apiSuccess (Response Fields) {String} job.id The live job id
  * @apiSuccess (Response Fields) {Boolean} job.privacy `TODO`
  * @apiSuccess (Response Fields) {String} job.state The current state of the job - possible values for Live jobs are `standby`, `waiting`, `processing`, `disconnected`. `finishing`, `finished`, `cancelling`, `cancelled`, `failed`; possible values for VOD jobs are `waiting_finish_live`, `waiting`, `processing`, `creating_asset`, `cancelling`, `cancelled`, `finished`, `failed`
  * @apiSuccess (Response Fields) {DateTimeString} job.submitted_at ISO 8601 date-time string representing when the job was submitted
  * @apiSuccess (Response Fields) {Boolean} job.test `TODO`
  * @apiSuccess (Response Fields) {DateTimeString} job.updated_at ISO 8601 date-time string representing when the job was last modified
  * @apiSuccess (Response Fields) {String} job.region The Amazon AWS region to use for encoding the job
  * @apiSuccess (Response Fields) {Number} job.reconnect_time The time, in seconds, that the system will wait for a stream to reconnect to the encoder
  * @apiSuccess (Response Fields) {Number} job.event_length The time, in seconds, that the system will keep the live stream available
  * @apiSuccess (Response Fields) {Number} job.live_sliding_window_duration The time, in seconds, kept in the live DVR manifest
  * @apiSuccess (Response Fields) {Boolean} job.live_stream Indicates whether this is a live stream or VOD
  * @apiSuccess (Response Fields) {Boolean} job.ad_insertion Indicates whether SSAI is enabled
  * @apiSuccess (Response Fields) {Boolean} job.metadata_passthrough `TODO`
  * @apiSuccess (Response Fields) {Number} job.out_worker_bytes `TODO`
  * @apiSuccess (Response Fields) {Number} job.out_worker_bytes_rate `TODO`
  * @apiSuccess (Response Fields) {String} job.playback_url Playback URL for the live stream
  * @apiSuccess (Response Fields) {String} job.playback_url_dvr Playback URL for the live DVR
  * @apiSuccess (Response Fields) {Object} job.input_media_file Object containing properties for the input media file
  * @apiSuccess (Response Fields) {Number} job.input_media_file.audio_bitrate_in_kbps Audio bitrate of the input media file
  * @apiSuccess (Response Fields) {String} job.input_media_file.audio_codec Audio codec of the input media file
  * @apiSuccess (Response Fields) {Number} job.input_media_file.audio_sample_rate Audio sample rate of the input media file
  * @apiSuccess (Response Fields) {Number} job.input_media_file.audio_tracks The number of audio tracks
  * @apiSuccess (Response Fields) {Number} job.input_media_file.channels The number of audio channels
  * @apiSuccess (Response Fields) {DateTimeString} job.input_media_file.created_at ISO 8601 date-time string representing when the input file was created
  * @apiSuccess (Response Fields) {Number} job.input_media_file.duration_in_ms duration_in_ms.
  * @apiSuccess (Response Fields) {String} job.input_media_file.error_class Type of error thrown
  * @apiSuccess (Response Fields) {String} job.input_media_file.error_message Error message thrown
  * @apiSuccess (Response Fields) {Number} job.input_media_file.file_size_bytes File size
  * @apiSuccess (Response Fields) {DateTimeString} job.input_media_file.finished_at ISO 8601 date-time string representing when the input file was finished
  * @apiSuccess (Response Fields) {String} job.input_media_file.format Format of the input file
  * @apiSuccess (Response Fields) {Number} job.input_media_file.frame_rate Frame rate of the input file
  * @apiSuccess (Response Fields) {Number} job.input_media_file.height Frame height of the input file
  * @apiSuccess (Response Fields) {String} job.input_media_file.id System id of the input file
  * @apiSuccess (Response Fields) {String} job.input_media_file.md5_checksum Checksum for the input file
  * @apiSuccess (Response Fields) {Boolean} job.input_media_file.privacy `TODO`
  * @apiSuccess (Response Fields) {String} job.input_media_file.state Current state of input file processing
  * @apiSuccess (Response Fields) {Boolean} job.input_media_file.test `TODO`
  * @apiSuccess (Response Fields) {DateTimeString} job.input_media_file.updated_at ISO 8601 date-time string representing when the input file was last modified
  * @apiSuccess (Response Fields) {Number} job.input_media_file.video_bitrate_in_kbps Video bitrate of the input media file
  * @apiSuccess (Response Fields) {String} job.input_media_file.video_codec Video codec of the input media file
  * @apiSuccess (Response Fields) {Number} job.input_media_file.width Frame width of the input media file
  * @apiSuccess (Response Fields) {Number} job.input_media_file.total_bitrate_in_kbps Total bitrate of the input media file
  * @apiSuccess (Response Fields) {String} job.input_media_file.url URL for the input media file
  * @apiSuccess (Response Fields) {String} job.slate id for a slate of assets included
  * @apiSuccess (Response Fields) {Object} job.stream Object containing properties for the live stream
  * @apiSuccess (Response Fields) {DateTimeString} job.stream.created_at ISO 8601 date-time string representing when the stream was created
  * @apiSuccess (Response Fields) {Number} job.stream.duration ISO Duration of the stream in seconds
  * @apiSuccess (Response Fields) {DateTimeString} job.stream.finished_at ISO 8601 date-time string representing when the stream was finished
  * @apiSuccess (Response Fields) {Number} job.stream.height Frame height of the stream
  * @apiSuccess (Response Fields) {String} job.stream.id System id of the stream
  * @apiSuccess (Response Fields) {String} job.stream.name Name of the stream
  * @apiSuccess (Response Fields) {String} job.stream.protocol Protocol of the stream
  * @apiSuccess (Response Fields) {Boolean} job.stream.test `TODO`
  * @apiSuccess (Response Fields) {DateTimeString} job.stream.updated_at ISO 8601 date-time string representing when the stream was last modified
  * @apiSuccess (Response Fields) {Number} job.stream.video_bitrate_in_kbps Video bitrate of the input media file
  * @apiSuccess (Response Fields) {String} job.stream.video_codec Video codec of the input media file
  * @apiSuccess (Response Fields) {Number} job.stream.width Frame width of the stream
  * @apiSuccess (Response Fields) {Number} job.stream.total_bitrate_in_kbps Total bitrate of the stream
  * @apiSuccess (Response Fields) {String} job.stream.region AWS region list specified for the account
  * @apiSuccess (Response Fields) {String} job.stream.url URL for the stream
  * @apiSuccess (Response Fields) {Object} job.stream.location Object representing the location of the stream
  * @apiSuccess (Response Fields) {Object} job.stream.location.source Object representing the location source of the stream
  * @apiSuccess (Response Fields) {Object} job.stream.location.source.latitude `TODO`
  * @apiSuccess (Response Fields) {Object} job.stream.location.source.longitude `TODO`
  * @apiSuccess (Response Fields) {Object} job.stream.location.source.location `TODO`
  * @apiSuccess (Response Fields) {Object} job.stream.destination Object representing the destination of the stream
  * @apiSuccess (Response Fields) {Object} job.stream.destination.source Object representing the destination source of the stream
  * @apiSuccess (Response Fields) {Object} job.stream.destination.source.latitude `TODO`
  * @apiSuccess (Response Fields) {Object} job.stream.destination.source.longitude `TODO`
  * @apiSuccess (Response Fields) {Object} job.stream.destination.source.location `TODO`
  * @apiSuccess (Response Fields) {Number} job.stream.in_worker_bytes `TODO`
  * @apiSuccess (Response Fields) {Number} job.stream.in_worker_bytes_rate `TODO`
  * @apiSuccess (Response Fields) {Object[]} job.output_media_files Array of objects containing properties for the output media files
  * @apiSuccess (Response Fields) {Number} job.output_media_files.audio_bitrate_in_kbps Audio bitrate of the output media file
  * @apiSuccess (Response Fields) {String} job.output_media_files.audio_codec Audio codec of the output media file
  * @apiSuccess (Response Fields) {Number} job.output_media_files.audio_sample_rate Audio sample rate of the output media file
  * @apiSuccess (Response Fields) {Number} job.output_media_files.audio_tracks The number of audio tracks
  * @apiSuccess (Response Fields) {Number} job.output_media_files.channels The number of audio channels
  * @apiSuccess (Response Fields) {DateTimeString} job.output_media_files.created_at ISO 8601 date-time string representing when the output file was created
  * @apiSuccess (Response Fields) {Number} job.output_media_files.duration_in_ms ISO 8601 date-time string representing when the output file was created
  * @apiSuccess (Response Fields) {String} job.output_media_files.error_class Type of error thrown
  * @apiSuccess (Response Fields) {String} job.output_media_files.error_message Error message thrown
  * @apiSuccess (Response Fields) {Number} job.output_media_files.file_size_bytes File size
  * @apiSuccess (Response Fields) {DateTimeString} job.output_media_files.finished_at ISO 8601 date-time string representing when the output file was finished
  * @apiSuccess (Response Fields) {String} job.output_media_files.format Format of the output file
  * @apiSuccess (Response Fields) {Number} job.output_media_files.fragment_duration_in_ms `TODO`
  * @apiSuccess (Response Fields) {Number} job.output_media_files.frame_rate Frame rate of the output file
  * @apiSuccess (Response Fields) {Number} job.output_media_files.height Frame height of the output file
  * @apiSuccess (Response Fields) {String} job.output_media_files.id System id of the output file
  * @apiSuccess (Response Fields) {String} job.output_media_files.md5_checksum Checksum for the output file
  * @apiSuccess (Response Fields) {Boolean} job.output_media_files.privacy `TODO`
  * @apiSuccess (Response Fields) {String} job.output_media_files.rfc_6381_audio_codec `TODO`
  * @apiSuccess (Response Fields) {String} job.output_media_files.rfc_6381_video_codec `TODO`
  * @apiSuccess (Response Fields) {String} job.output_media_files.state Current state of output file processing
  * @apiSuccess (Response Fields) {Boolean} job.output_media_files.test `TODO`
  * @apiSuccess (Response Fields) {DateTimeString} job.output_media_files.updated_at ISO 8601 date-time string representing when the output file was last modified
  * @apiSuccess (Response Fields) {Number} job.output_media_files.video_bitrate_in_kbps Video bitrate of the output media file
  * @apiSuccess (Response Fields) {String} job.output_media_files.video_codec Video codec of the output media file
  * @apiSuccess (Response Fields) {Number} job.output_media_files.width Frame width of the output media file
  * @apiSuccess (Response Fields) {Number} job.output_media_files.total_bitrate_in_kbps Total bitrate of the output media file
  * @apiSuccess (Response Fields) {Number} job.output_media_files.keyframe_interval Keyframe interval for the output media file
  * @apiSuccess (Response Fields) {Boolean} job.output_media_files.keyframe_interval_follow_source Whether keyframe rate for the output matches the source
  * @apiSuccess (Response Fields) {Number} job.output_media_files.live_stream Whether the output is a live stream
  * @apiSuccess (Response Fields) {Boolean} job.output_media_files.keyframe_interval Keyframe interval for the output media file
  * @apiSuccess (Response Fields) {String} job.output_media_files.playback_url URL for the output file
  * @apiSuccess (Response Fields) {String} job.output_media_files.playback_url_dvr Live DVR url for live stream output
  * @apiSuccess (Response Fields) {String} job.output_media_files.playback_url_vod  URL for VOD output
  * @apiSuccess (Response Fields) {String} job.output_media_files.playlist_type Playlist type for playlist output
  * @apiSuccess (Response Fields) {String} job.output_media_files.type Will be `playlist` for playlist output
  * @apiSuccess (Response Fields) {String} job.output_media_files.filename File name for the playlist manifest
  * @apiSuccess (Response Fields) {String} job.output_media_files.dvr_filename File name for the DVR playlist manifest
  *
  * @apiSuccessExample {json} Success Response Get Live Job Details:
  *    HTTP/1.1 200 OK
  *    {
  *      "lastevaluatedkey": "",
  *      "jobs": [
  *        {
  *          "job": {
  *            "job_playlists": [
  *              {
  *                "delivery": {
  *                  "media_cdn_prepend": "playback.bcovlive.io",
  *                  "ssai_cdn_prepend": "playback.bcovlive.io",
  *                  "media_cdn_protocol": "http",
  *                  "ssai_manifest_append": "_ssaiM",
  *                  "ssai_cdn_protocol": "http"
  *                },
  *                "masterLocation": "alive-pr-us-west-2-media",
  *                "default_playlist_name": "playlist.m3u8",
  *                "type": {
  *                  "protocol": "HTTP",
  *                  "profile": "BcovAliveCupertino",
  *                  "name": "defaultS3",
  *                  "streaming_delivery_format": "hls",
  *                  "video_format": "mpeg-ts",
  *                  "pushpublish": "bcov",
  *                  "type": "S3"
  *                },
  *                "profile_sources": [
  *                  "profile_0",
  *                  "profile_1",
  *                  "profile_2"
  *                ],
  *                "default_dvr_playlist_name": "playlist_dvr.m3u8",
  *                "playlist_name": "playlist.m3u8",
  *                "default_chunklist_name": "chunklist.m3u8",
  *                "default_dvr_chunklist_name": "chunklist_dvr.m3u8",
  *                "playback_url": "http://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/playlist.m3u8",
  *                "default_vod_chunklist_name": "chunklist_vod.m3u8",
  *                "default_s3_bucket": "alive-pr-[[region]]-media",
  *                "dvr_playlist_name": "playlist_dvr.m3u8",
  *                "default_s3_bucket_ads": "alive-pr-[[region]]-ads",
  *                "playback_url_dvr": "http://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/playlist_dvr.m3u8"
  *              }
  *            ],
  *            "job_out_bytes": 0,
  *            "job_raw_input": {
  *              "outputs": [
  *                {
  *                  "video_codec": "h264",
  *                  "keyframe_interval": 60,
  *                  "live_stream": true,
  *                  "segment_seconds": 4,
  *                  "width": 1280,
  *                  "h264_profile": "high",
  *                  "label": "hls720p",
  *                  "video_bitrate": 2100,
  *                  "height": 720
  *                },
  *                {
  *                  "video_codec": "h264",
  *                  "keyframe_interval": 60,
  *                  "live_stream": true,
  *                  "segment_seconds": 4,
  *                  "width": 960,
  *                  "h264_profile": "main",
  *                  "label": "hls540p",
  *                  "video_bitrate": 1500,
  *                  "height": 540
  *                },
  *                {
  *                  "video_codec": "h264",
  *                  "keyframe_interval": 60,
  *                  "live_stream": true,
  *                  "segment_seconds": 4,
  *                  "width": 640,
  *                  "h264_profile": "main",
  *                  "label": "hls360p",
  *                  "video_bitrate": 800,
  *                  "height": 360
  *                }
  *              ],
  *              "live_sliding_window_duration": 1,
  *              "live_stream": true,
  *              "region": "us-west-2",
  *              "reconnect_time": 1800
  *            },
  *            "job_id": "52f0508ce379496780a9073919435a3b",
  *            "job_group_all_stream_name": "all",
  *            "job_in_bytes_rate": 0,
  *            "job_region": "us-west-2",
  *            "job_load": 330,
  *            "job_in_bytes": 0,
  *            "job_input": {
  *              "vod_sliding_window_duration_ms": 93600000,
  *              "ext_x_version": 3,
  *              "static": false,
  *              "number_of_segments_in_dvr_chunklist": 3,
  *              "reconnect_time_ms": 1800000,
  *              "ad_insertion": false,
  *              "max_waiting_time_ms": 1800000,
  *              "metadata_passthrough": false,
  *              "vod_enabled": true,
  *              "live_sliding_window_duration_ms": 1000,
  *              "segment_duration_ms": 4000,
  *              "live_dvr_sliding_window_duration_ms": 1000,
  *              "event_length_ms": 0,
  *              "number_of_segments_in_live_chunklist": 3,
  *              "number_of_segments_in_vod_chunklist": 23400,
  *              "region": "us-west-2"
  *            },
  *            "account_billing_id": "NA",
  *            "job_stream_url": "rtmp://ec2-52-40-245-178.us-west-2.compute.amazonaws.com:1935/52f0508ce379496780a9073919435a3b",
  *            "job_ssai_state": "none",
  *            "job_outputs": [
  *              {
  *                "video_height": 720,
  *                "video_width": 1280,
  *                "audio_codec": "AAC",
  *                "type": {
  *                  "protocol": "HTTP",
  *                  "profile": "BcovAliveCupertino",
  *                  "name": "defaultS3",
  *                  "streaming_delivery_format": "hls",
  *                  "video_format": "mpeg-ts",
  *                  "pushpublish": "bcov",
  *                  "type": "S3"
  *                },
  *                "video_fit_mode": "stretch",
  *                "profile_name": "profile_0",
  *                "segment_duration_ms": 4000,
  *                "playback_url": "http://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_0/chunklist.m3u8",
  *                "video_keyframe_interval_follow_source": false,
  *                "playback_url_dvr": "http://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_0/chunklist_dvr.m3u8",
  *                "video_codec": "H.264",
  *                "video_codec_level": "3.1",
  *                "playback_url_vod": "http://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_0/chunklist_vod.m3u8",
  *                "audio_bitrate_bps": 196608,
  *                "gpuid": -1,
  *                "video_keyframe_interval": 60,
  *                "label": "hls720p",
  *                "info_streaming_delivery_format": "hls",
  *                "video_codec_profile": "high",
  *                "name": "Out0",
  *                "info_format": "mpeg-ts",
  *                "video_bitrate_bps": 2150400,
  *                "ui_playback_url": "https://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_0/chunklist.m3u8",
  *                "ui_playback_url_dvr": "https://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_0/chunklist_dvr.m3u8",
  *                "ui_playback_url_vod": "https://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_0/chunklist_vod.m3u8"
  *              },
  *              {
  *                "video_height": 540,
  *                "video_width": 960,
  *                "audio_codec": "AAC",
  *                "type": {
  *                  "protocol": "HTTP",
  *                  "profile": "BcovAliveCupertino",
  *                  "name": "defaultS3",
  *                  "streaming_delivery_format": "hls",
  *                  "video_format": "mpeg-ts",
  *                  "pushpublish": "bcov",
  *                  "type": "S3"
  *                },
  *                "video_fit_mode": "stretch",
  *                "profile_name": "profile_1",
  *                "segment_duration_ms": 4000,
  *                "playback_url": "http://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_1/chunklist.m3u8",
  *                "video_keyframe_interval_follow_source": false,
  *                "playback_url_dvr": "http://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_1/chunklist_dvr.m3u8",
  *                "video_codec": "H.264",
  *                "video_codec_level": "3.1",
  *                "playback_url_vod": "http://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_1/chunklist_vod.m3u8",
  *                "audio_bitrate_bps": 196608,
  *                "gpuid": -1,
  *                "video_keyframe_interval": 60,
  *                "label": "hls540p",
  *                "info_streaming_delivery_format": "hls",
  *                "video_codec_profile": "main",
  *                "name": "Out1",
  *                "info_format": "mpeg-ts",
  *                "video_bitrate_bps": 1536000,
  *                "ui_playback_url": "https://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_1/chunklist.m3u8",
  *                "ui_playback_url_dvr": "https://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_1/chunklist_dvr.m3u8",
  *                "ui_playback_url_vod": "https://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_1/chunklist_vod.m3u8"
  *              },
  *              {
  *                "video_height": 360,
  *                "video_width": 640,
  *                "audio_codec": "AAC",
  *                "type": {
  *                  "protocol": "HTTP",
  *                  "profile": "BcovAliveCupertino",
  *                  "name": "defaultS3",
  *                  "streaming_delivery_format": "hls",
  *                  "video_format": "mpeg-ts",
  *                  "pushpublish": "bcov",
  *                  "type": "S3"
  *                },
  *                "video_fit_mode": "stretch",
  *                "profile_name": "profile_2",
  *                "segment_duration_ms": 4000,
  *                "playback_url": "http://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_2/chunklist.m3u8",
  *                "video_keyframe_interval_follow_source": false,
  *                "playback_url_dvr": "http://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_2/chunklist_dvr.m3u8",
  *                "video_codec": "H.264",
  *                "video_codec_level": "3.1",
  *                "playback_url_vod": "http://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_2/chunklist_vod.m3u8",
  *                "audio_bitrate_bps": 196608,
  *                "gpuid": -1,
  *                "video_keyframe_interval": 60,
  *                "label": "hls360p",
  *                "info_streaming_delivery_format": "hls",
  *                "video_codec_profile": "main",
  *                "name": "Out2",
  *                "info_format": "mpeg-ts",
  *                "video_bitrate_bps": 819200,
  *                "ui_playback_url": "https://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_2/chunklist.m3u8",
  *                "ui_playback_url_dvr": "https://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_2/chunklist_dvr.m3u8",
  *                "ui_playback_url_vod": "https://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/profile_2/chunklist_vod.m3u8"
  *              }
  *            ],
  *            "job_tick": 100,
  *            "job_transcoding_template_name": "52f0508ce379496780a9073919435a3b_trans_template",
  *            "job_state": "finished",
  *            "cloud_id": "ede5802b4167493eae6f8a93ac98f352",
  *            "job_sep_state": "finished",
  *            "sep_data": {
  *
  *            },
  *            "job_created_at": 1506682558405,
  *            "account_id": "a95ac581551b4478b27910e5675db1f8",
  *            "job_stream_name": "alive",
  *            "job_out_bytes_rate": 0,
  *            "job_finished_at": 1506684429938,
  *            "user_id": "c2691d4d039040be96c190a949d754a7",
  *            "job_streaming_started_at": 0,
  *            "job_app_name": "52f0508ce379496780a9073919435a3b",
  *            "job_last_state_change_at": 1506684429938,
  *            "job_cancelling_flag": false,
  *            "encryption": {
  *
  *            },
  *            "permitted_to_add_dependent_vods": true,
  *            "vods": [
  *
  *            ],
  *            "job_playback_url": "http://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/playlist.m3u8",
  *            "job_playback_url_dvr": "http://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/playlist_dvr.m3u8",
  *            "job_ui_playback_url": "https://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/playlist.m3u8",
  *            "job_ui_playback_url_dvr": "https://playback.bcovlive.io/52f0508ce379496780a9073919435a3b/us-west-2/NA/playlist_dvr.m3u8"
  *          }
  *        },
  *        {
  *          "job": {
  *            "job_playlists": [
  *              {
  *                "delivery": {
  *                  "media_cdn_prepend": "playback.bcovlive.io",
  *                  "ssai_cdn_prepend": "playback.bcovlive.io",
  *                  "media_cdn_protocol": "http",
  *                  "ssai_manifest_append": "_ssaiM",
  *                  "ssai_cdn_protocol": "http"
  *                },
  *                "masterLocation": "alive-pr-us-west-2-media",
  *                "default_playlist_name": "playlist.m3u8",
  *                "type": {
  *                  "protocol": "HTTP",
  *                  "profile": "BcovAliveCupertino",
  *                  "name": "defaultS3",
  *                  "streaming_delivery_format": "hls",
  *                  "video_format": "mpeg-ts",
  *                  "pushpublish": "bcov",
  *                  "type": "S3"
  *                },
  *                "profile_sources": [
  *                  "profile_0",
  *                  "profile_1",
  *                  "profile_2"
  *                ],
  *                "default_dvr_playlist_name": "playlist_dvr.m3u8",
  *                "playlist_name": "playlist.m3u8",
  *                "default_chunklist_name": "chunklist.m3u8",
  *                "default_dvr_chunklist_name": "chunklist_dvr.m3u8",
  *                "playback_url": "http://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/playlist.m3u8",
  *                "default_vod_chunklist_name": "chunklist_vod.m3u8",
  *                "default_s3_bucket": "alive-pr-[[region]]-media",
  *                "dvr_playlist_name": "playlist_dvr.m3u8",
  *                "default_s3_bucket_ads": "alive-pr-[[region]]-ads",
  *                "playback_url_dvr": "http://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/playlist_dvr.m3u8"
  *              }
  *            ],
  *            "job_out_bytes": 0,
  *            "job_raw_input": {
  *              "outputs": [
  *                {
  *                  "video_codec": "h264",
  *                  "keyframe_interval": 60,
  *                  "live_stream": true,
  *                  "segment_seconds": 4,
  *                  "width": 1280,
  *                  "h264_profile": "high",
  *                  "label": "hls720p",
  *                  "video_bitrate": 2100,
  *                  "height": 720
  *                },
  *                {
  *                  "video_codec": "h264",
  *                  "keyframe_interval": 60,
  *                  "live_stream": true,
  *                  "segment_seconds": 4,
  *                  "width": 960,
  *                  "h264_profile": "main",
  *                  "label": "hls540p",
  *                  "video_bitrate": 1500,
  *                  "height": 540
  *                },
  *                {
  *                  "video_codec": "h264",
  *                  "keyframe_interval": 60,
  *                  "live_stream": true,
  *                  "segment_seconds": 4,
  *                  "width": 640,
  *                  "h264_profile": "main",
  *                  "label": "hls360p",
  *                  "video_bitrate": 800,
  *                  "height": 360
  *                }
  *              ],
  *              "live_sliding_window_duration": 57600,
  *              "live_stream": true,
  *              "region": "us-west-2",
  *              "reconnect_time": 1800
  *            },
  *            "job_id": "e058d5ed5758440b9396efc4f2737e18",
  *            "job_group_all_stream_name": "all",
  *            "job_in_bytes_rate": 0,
  *            "job_region": "us-west-2",
  *            "job_load": 330,
  *            "job_in_bytes": 0,
  *            "job_input": {
  *              "vod_sliding_window_duration_ms": 93600000,
  *              "ext_x_version": 3,
  *              "static": false,
  *              "number_of_segments_in_dvr_chunklist": 14400,
  *              "reconnect_time_ms": 1800000,
  *              "ad_insertion": false,
  *              "max_waiting_time_ms": 1800000,
  *              "metadata_passthrough": false,
  *              "vod_enabled": true,
  *              "live_sliding_window_duration_ms": 57600000,
  *              "segment_duration_ms": 4000,
  *              "live_dvr_sliding_window_duration_ms": 57600000,
  *              "event_length_ms": 0,
  *              "number_of_segments_in_live_chunklist": 3,
  *              "number_of_segments_in_vod_chunklist": 23400,
  *              "region": "us-west-2"
  *            },
  *            "account_billing_id": "NA",
  *            "job_stream_url": "rtmp://ec2-52-40-245-178.us-west-2.compute.amazonaws.com:1935/e058d5ed5758440b9396efc4f2737e18",
  *            "job_cleaning_started_at": 1506621792254,
  *            "job_ssai_state": "none",
  *            "job_outputs": [
  *              {
  *                "video_height": 720,
  *                "video_width": 1280,
  *                "audio_codec": "AAC",
  *                "type": {
  *                  "protocol": "HTTP",
  *                  "profile": "BcovAliveCupertino",
  *                  "name": "defaultS3",
  *                  "streaming_delivery_format": "hls",
  *                  "video_format": "mpeg-ts",
  *                  "pushpublish": "bcov",
  *                  "type": "S3"
  *                },
  *                "video_fit_mode": "stretch",
  *                "profile_name": "profile_0",
  *                "segment_duration_ms": 4000,
  *                "playback_url": "http://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_0/chunklist.m3u8",
  *                "video_keyframe_interval_follow_source": false,
  *                "playback_url_dvr": "http://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_0/chunklist_dvr.m3u8",
  *                "video_codec": "H.264",
  *                "video_codec_level": "3.1",
  *                "playback_url_vod": "http://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_0/chunklist_vod.m3u8",
  *                "audio_bitrate_bps": 196608,
  *                "gpuid": -1,
  *                "video_keyframe_interval": 60,
  *                "label": "hls720p",
  *                "info_streaming_delivery_format": "hls",
  *                "video_codec_profile": "high",
  *                "name": "Out0",
  *                "info_format": "mpeg-ts",
  *                "video_bitrate_bps": 2150400,
  *                "ui_playback_url": "https://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_0/chunklist.m3u8",
  *                "ui_playback_url_dvr": "https://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_0/chunklist_dvr.m3u8",
  *                "ui_playback_url_vod": "https://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_0/chunklist_vod.m3u8"
  *              },
  *              {
  *                "video_height": 540,
  *                "video_width": 960,
  *                "audio_codec": "AAC",
  *                "type": {
  *                  "protocol": "HTTP",
  *                  "profile": "BcovAliveCupertino",
  *                  "name": "defaultS3",
  *                  "streaming_delivery_format": "hls",
  *                  "video_format": "mpeg-ts",
  *                  "pushpublish": "bcov",
  *                  "type": "S3"
  *                },
  *                "video_fit_mode": "stretch",
  *                "profile_name": "profile_1",
  *                "segment_duration_ms": 4000,
  *                "playback_url": "http://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_1/chunklist.m3u8",
  *                "video_keyframe_interval_follow_source": false,
  *                "playback_url_dvr": "http://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_1/chunklist_dvr.m3u8",
  *                "video_codec": "H.264",
  *                "video_codec_level": "3.1",
  *                "playback_url_vod": "http://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_1/chunklist_vod.m3u8",
  *                "audio_bitrate_bps": 196608,
  *                "gpuid": -1,
  *                "video_keyframe_interval": 60,
  *                "label": "hls540p",
  *                "info_streaming_delivery_format": "hls",
  *                "video_codec_profile": "main",
  *                "name": "Out1",
  *                "info_format": "mpeg-ts",
  *                "video_bitrate_bps": 1536000,
  *                "ui_playback_url": "https://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_1/chunklist.m3u8",
  *                "ui_playback_url_dvr": "https://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_1/chunklist_dvr.m3u8",
  *                "ui_playback_url_vod": "https://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_1/chunklist_vod.m3u8"
  *              },
  *              {
  *                "video_height": 360,
  *                "video_width": 640,
  *                "audio_codec": "AAC",
  *                "type": {
  *                  "protocol": "HTTP",
  *                  "profile": "BcovAliveCupertino",
  *                  "name": "defaultS3",
  *                  "streaming_delivery_format": "hls",
  *                  "video_format": "mpeg-ts",
  *                  "pushpublish": "bcov",
  *                  "type": "S3"
  *                },
  *                "video_fit_mode": "stretch",
  *                "profile_name": "profile_2",
  *                "segment_duration_ms": 4000,
  *                "playback_url": "http://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_2/chunklist.m3u8",
  *                "video_keyframe_interval_follow_source": false,
  *                "playback_url_dvr": "http://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_2/chunklist_dvr.m3u8",
  *                "video_codec": "H.264",
  *                "video_codec_level": "3.1",
  *                "playback_url_vod": "http://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_2/chunklist_vod.m3u8",
  *                "audio_bitrate_bps": 196608,
  *                "gpuid": -1,
  *                "video_keyframe_interval": 60,
  *                "label": "hls360p",
  *                "info_streaming_delivery_format": "hls",
  *                "video_codec_profile": "main",
  *                "name": "Out2",
  *                "info_format": "mpeg-ts",
  *                "video_bitrate_bps": 819200,
  *                "ui_playback_url": "https://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_2/chunklist.m3u8",
  *                "ui_playback_url_dvr": "https://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_2/chunklist_dvr.m3u8",
  *                "ui_playback_url_vod": "https://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/profile_2/chunklist_vod.m3u8"
  *              }
  *            ],
  *            "job_tick": 99,
  *            "job_transcoding_template_name": "e058d5ed5758440b9396efc4f2737e18_trans_template",
  *            "job_cleaning_in_progress": false,
  *            "job_state": "finished",
  *            "cloud_id": "ede5802b4167493eae6f8a93ac98f352",
  *            "job_sep_state": "finished",
  *            "sep_data": {
  *
  *            },
  *            "job_created_at": 1506621430540,
  *            "account_id": "a95ac581551b4478b27910e5675db1f8",
  *            "job_stream_name": "alive",
  *            "job_out_bytes_rate": 0,
  *            "job_cleaning_error": false,
  *            "job_finished_at": 1506623289414,
  *            "user_id": "c2691d4d039040be96c190a949d754a7",
  *            "job_streaming_started_at": 0,
  *            "job_app_name": "e058d5ed5758440b9396efc4f2737e18",
  *            "job_last_state_change_at": 1506623289414,
  *            "job_cancelling_flag": false,
  *            "encryption": {
  *
  *            },
  *            "permitted_to_add_dependent_vods": true,
  *            "vods": [
  *
  *            ],
  *            "job_playback_url": "http://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/playlist.m3u8",
  *            "job_playback_url_dvr": "http://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/playlist_dvr.m3u8",
  *            "job_ui_playback_url": "https://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/playlist.m3u8",
  *            "job_ui_playback_url_dvr": "https://playback.bcovlive.io/e058d5ed5758440b9396efc4f2737e18/us-west-2/NA/playlist_dvr.m3u8"
  *          }
  *        }
  *      ]
  *    }
  *
  */

// Get Live Job Details

 /**
  * @api {get} /v1/jobs/:jobId Get Live Job Details
  * @apiName Get Live Job Details
  * @apiGroup Live_Jobs
  * @apiVersion 1.0.0
  *
  * @apiDescription Get Live Job Details
  *
  * @apiHeader {String} Content-Type: application/json
  * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
  *
  * @apiParam (URL Parameters) {String} jobId The job id you want details for.
  *
  * @apiParamExample {url} Live Stream Custom Origin Example:
  *     https://api.bcovlive.io/v1/jobs/3158f1c9bc5c462182079f434ba4ae0a
  *
  * @apiSuccess (Response Fields) {Object} job Object containing the job details
  * @apiSuccess (Response Fields) {DateTimeString} job.created_at ISO 8601 date-time string representing when the job was created
  * @apiSuccess (Response Fields) {DateTimeString} job.finished_at ISO 8601 date-time string representing when the live stream was stopped
  * @apiSuccess (Response Fields) {String} job.id The live job id
  * @apiSuccess (Response Fields) {Boolean} job.privacy `TODO`
  * @apiSuccess (Response Fields) {String} job.state The current state of the job - possible values for Live jobs are `standby`, `waiting`, `processing`, `disconnected`. `finishing`, `finished`, `cancelling`, `cancelled`, `failed`; possible values for VOD jobs are `waiting_finish_live`, `waiting`, `processing`, `creating_asset`, `cancelling`, `cancelled`, `finished`, `failed`
  * @apiSuccess (Response Fields) {DateTimeString} job.submitted_at ISO 8601 date-time string representing when the job was submitted
  * @apiSuccess (Response Fields) {Boolean} job.test `TODO`
  * @apiSuccess (Response Fields) {DateTimeString} job.updated_at ISO 8601 date-time string representing when the job was last modified
  * @apiSuccess (Response Fields) {String} job.region The Amazon AWS region to use for encoding the job
  * @apiSuccess (Response Fields) {Number} job.reconnect_time The time, in seconds, that the system will wait for a stream to reconnect to the encoder
  * @apiSuccess (Response Fields) {Number} job.event_length The time, in seconds, that the system will keep the live stream available
  * @apiSuccess (Response Fields) {Number} job.live_sliding_window_duration The time, in seconds, kept in the live DVR manifest
  * @apiSuccess (Response Fields) {Boolean} job.live_stream Indicates whether this is a live stream or VOD
  * @apiSuccess (Response Fields) {Boolean} job.ad_insertion Indicates whether SSAI is enabled
  * @apiSuccess (Response Fields) {Boolean} job.metadata_passthrough `TODO`
  * @apiSuccess (Response Fields) {Number} job.out_worker_bytes `TODO`
  * @apiSuccess (Response Fields) {Number} job.out_worker_bytes_rate `TODO`
  * @apiSuccess (Response Fields) {String} job.playback_url Playback URL for the live stream
  * @apiSuccess (Response Fields) {String} job.playback_url_dvr Playback URL for the live DVR
  * @apiSuccess (Response Fields) {Object} job.input_media_file Object containing properties for the input media file
  * @apiSuccess (Response Fields) {Number} job.input_media_file.audio_bitrate_in_kbps Audio bitrate of the input media file
  * @apiSuccess (Response Fields) {String} job.input_media_file.audio_codec Audio codec of the input media file
  * @apiSuccess (Response Fields) {Number} job.input_media_file.audio_sample_rate Audio sample rate of the input media file
  * @apiSuccess (Response Fields) {Number} job.input_media_file.audio_tracks The number of audio tracks
  * @apiSuccess (Response Fields) {Number} job.input_media_file.channels The number of audio channels
  * @apiSuccess (Response Fields) {DateTimeString} job.input_media_file.created_at ISO 8601 date-time string representing when the input file was created
  * @apiSuccess (Response Fields) {Number} job.input_media_file.duration_in_ms duration_in_ms.
  * @apiSuccess (Response Fields) {String} job.input_media_file.error_class Type of error thrown
  * @apiSuccess (Response Fields) {String} job.input_media_file.error_message Error message thrown
  * @apiSuccess (Response Fields) {Number} job.input_media_file.file_size_bytes File size
  * @apiSuccess (Response Fields) {DateTimeString} job.input_media_file.finished_at ISO 8601 date-time string representing when the input file was finished
  * @apiSuccess (Response Fields) {String} job.input_media_file.format Format of the input file
  * @apiSuccess (Response Fields) {Number} job.input_media_file.frame_rate Frame rate of the input file
  * @apiSuccess (Response Fields) {Number} job.input_media_file.height Frame height of the input file
  * @apiSuccess (Response Fields) {String} job.input_media_file.id System id of the input file
  * @apiSuccess (Response Fields) {String} job.input_media_file.md5_checksum Checksum for the input file
  * @apiSuccess (Response Fields) {Boolean} job.input_media_file.privacy `TODO`
  * @apiSuccess (Response Fields) {String} job.input_media_file.state Current state of input file processing
  * @apiSuccess (Response Fields) {Boolean} job.input_media_file.test `TODO`
  * @apiSuccess (Response Fields) {DateTimeString} job.input_media_file.updated_at ISO 8601 date-time string representing when the input file was last modified
  * @apiSuccess (Response Fields) {Number} job.input_media_file.video_bitrate_in_kbps Video bitrate of the input media file
  * @apiSuccess (Response Fields) {String} job.input_media_file.video_codec Video codec of the input media file
  * @apiSuccess (Response Fields) {Number} job.input_media_file.width Frame width of the input media file
  * @apiSuccess (Response Fields) {Number} job.input_media_file.total_bitrate_in_kbps Total bitrate of the input media file
  * @apiSuccess (Response Fields) {String} job.input_media_file.url URL for the input media file
  * @apiSuccess (Response Fields) {String} job.slate id for a slate of assets included
  * @apiSuccess (Response Fields) {Object} job.stream Object containing properties for the live stream
  * @apiSuccess (Response Fields) {DateTimeString} job.stream.created_at ISO 8601 date-time string representing when the stream was created
  * @apiSuccess (Response Fields) {Number} job.stream.duration ISO Duration of the stream in seconds
  * @apiSuccess (Response Fields) {DateTimeString} job.stream.finished_at ISO 8601 date-time string representing when the stream was finished
  * @apiSuccess (Response Fields) {Number} job.stream.height Frame height of the stream
  * @apiSuccess (Response Fields) {String} job.stream.id System id of the stream
  * @apiSuccess (Response Fields) {String} job.stream.name Name of the stream
  * @apiSuccess (Response Fields) {String} job.stream.protocol Protocol of the stream
  * @apiSuccess (Response Fields) {Boolean} job.stream.test `TODO`
  * @apiSuccess (Response Fields) {DateTimeString} job.stream.updated_at ISO 8601 date-time string representing when the stream was last modified
  * @apiSuccess (Response Fields) {Number} job.stream.video_bitrate_in_kbps Video bitrate of the input media file
  * @apiSuccess (Response Fields) {String} job.stream.video_codec Video codec of the input media file
  * @apiSuccess (Response Fields) {Number} job.stream.width Frame width of the stream
  * @apiSuccess (Response Fields) {Number} job.stream.total_bitrate_in_kbps Total bitrate of the stream
  * @apiSuccess (Response Fields) {String} job.stream.region AWS region list specified for the account
  * @apiSuccess (Response Fields) {String} job.stream.url URL for the stream
  * @apiSuccess (Response Fields) {Object} job.stream.location Object representing the location of the stream
  * @apiSuccess (Response Fields) {Object} job.stream.location.source Object representing the location source of the stream
  * @apiSuccess (Response Fields) {Object} job.stream.location.source.latitude `TODO`
  * @apiSuccess (Response Fields) {Object} job.stream.location.source.longitude `TODO`
  * @apiSuccess (Response Fields) {Object} job.stream.location.source.location `TODO`
  * @apiSuccess (Response Fields) {Object} job.stream.destination Object representing the destination of the stream
  * @apiSuccess (Response Fields) {Object} job.stream.destination.source Object representing the destination source of the stream
  * @apiSuccess (Response Fields) {Object} job.stream.destination.source.latitude `TODO`
  * @apiSuccess (Response Fields) {Object} job.stream.destination.source.longitude `TODO`
  * @apiSuccess (Response Fields) {Object} job.stream.destination.source.location `TODO`
  * @apiSuccess (Response Fields) {Number} job.stream.in_worker_bytes `TODO`
  * @apiSuccess (Response Fields) {Number} job.stream.in_worker_bytes_rate `TODO`
  * @apiSuccess (Response Fields) {Object[]} job.output_media_files Array of objects containing properties for the output media files
  * @apiSuccess (Response Fields) {Number} job.output_media_files.audio_bitrate_in_kbps Audio bitrate of the output media file
  * @apiSuccess (Response Fields) {String} job.output_media_files.audio_codec Audio codec of the output media file
  * @apiSuccess (Response Fields) {Number} job.output_media_files.audio_sample_rate Audio sample rate of the output media file
  * @apiSuccess (Response Fields) {Number} job.output_media_files.audio_tracks The number of audio tracks
  * @apiSuccess (Response Fields) {Number} job.output_media_files.channels The number of audio channels
  * @apiSuccess (Response Fields) {DateTimeString} job.output_media_files.created_at ISO 8601 date-time string representing when the output file was created
  * @apiSuccess (Response Fields) {Number} job.output_media_files.duration_in_ms ISO 8601 date-time string representing when the output file was created
  * @apiSuccess (Response Fields) {String} job.output_media_files.error_class Type of error thrown
  * @apiSuccess (Response Fields) {String} job.output_media_files.error_message Error message thrown
  * @apiSuccess (Response Fields) {Number} job.output_media_files.file_size_bytes File size
  * @apiSuccess (Response Fields) {DateTimeString} job.output_media_files.finished_at ISO 8601 date-time string representing when the output file was finished
  * @apiSuccess (Response Fields) {String} job.output_media_files.format Format of the output file
  * @apiSuccess (Response Fields) {Number} job.output_media_files.fragment_duration_in_ms `TODO`
  * @apiSuccess (Response Fields) {Number} job.output_media_files.frame_rate Frame rate of the output file
  * @apiSuccess (Response Fields) {Number} job.output_media_files.height Frame height of the output file
  * @apiSuccess (Response Fields) {String} job.output_media_files.id System id of the output file
  * @apiSuccess (Response Fields) {String} job.output_media_files.md5_checksum Checksum for the output file
  * @apiSuccess (Response Fields) {Boolean} job.output_media_files.privacy `TODO`
  * @apiSuccess (Response Fields) {String} job.output_media_files.rfc_6381_audio_codec `TODO`
  * @apiSuccess (Response Fields) {String} job.output_media_files.rfc_6381_video_codec `TODO`
  * @apiSuccess (Response Fields) {String} job.output_media_files.state Current state of output file processing
  * @apiSuccess (Response Fields) {Boolean} job.output_media_files.test `TODO`
  * @apiSuccess (Response Fields) {DateTimeString} job.output_media_files.updated_at ISO 8601 date-time string representing when the output file was last modified
  * @apiSuccess (Response Fields) {Number} job.output_media_files.video_bitrate_in_kbps Video bitrate of the output media file
  * @apiSuccess (Response Fields) {String} job.output_media_files.video_codec Video codec of the output media file
  * @apiSuccess (Response Fields) {Number} job.output_media_files.width Frame width of the output media file
  * @apiSuccess (Response Fields) {Number} job.output_media_files.total_bitrate_in_kbps Total bitrate of the output media file
  * @apiSuccess (Response Fields) {Number} job.output_media_files.keyframe_interval Keyframe interval for the output media file
  * @apiSuccess (Response Fields) {Boolean} job.output_media_files.keyframe_interval_follow_source Whether keyframe rate for the output matches the source
  * @apiSuccess (Response Fields) {Number} job.output_media_files.live_stream Whether the output is a live stream
  * @apiSuccess (Response Fields) {Boolean} job.output_media_files.keyframe_interval Keyframe interval for the output media file
  * @apiSuccess (Response Fields) {String} job.output_media_files.playback_url URL for the output file
  * @apiSuccess (Response Fields) {String} job.output_media_files.playback_url_dvr Live DVR url for live stream output
  * @apiSuccess (Response Fields) {String} job.output_media_files.playback_url_vod  URL for VOD output
  * @apiSuccess (Response Fields) {String} job.output_media_files.playlist_type Playlist type for playlist output
  * @apiSuccess (Response Fields) {String} job.output_media_files.type Will be `playlist` for playlist output
  * @apiSuccess (Response Fields) {String} job.output_media_files.filename File name for the playlist manifest
  * @apiSuccess (Response Fields) {String} job.output_media_files.dvr_filename File name for the DVR playlist manifest
  *
  * @apiSuccessExample {json} Success Response Get Live Job Details:
  *    HTTP/1.1 200 OK
  *    {
  *      "job": {
  *        "created_at": "2016-11-06T20:12:46.571Z",
  *        "finished_at": "2016-11-06T20:43:16.063Z",
  *        "id": "edb92295e0f744f088f473ac047538c3",
  *        "privacy": false,
  *        "state": "finished",
  *        "submitted_at": "2016-11-06T20:12:46.571Z",
  *        "test": false,
  *        "updated_at": "2016-11-06T20:42:55.980Z",
  *        "region": "my-region-list,
  *        "reconnect_time": 20,
  *        "event_length": 0,
  *        "live_sliding_window_duration": 30,
  *        "live_stream": true,
  *        "ad_insertion": false,
  *        "metadata_passthrough": false,
  *        "out_worker_bytes": 0,
  *        "out_worker_bytes_rate": 0,
  *        "playback_url": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/playlist.m3u8",
  *        "playback_url_dvr": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/playlist_dvr.m3u8",
  *        "input_media_file": {
  *          "audio_bitrate_in_kbps": null,
  *          "audio_codec": null,
  *          "audio_sample_rate": null,
  *          "audio_tracks": null,
  *          "channels": null,
  *          "created_at": "2016-11-06T20:12:46.571Z",
  *          "duration_in_ms": 1478464996063,
  *          "error_class": null,
  *          "error_message": null,
  *          "file_size_bytes": null,
  *          "finished_at": "2016-11-06T20:43:16.063Z",
  *          "format": null,
  *          "frame_rate": null,
  *          "height": null,
  *          "id": "input-edb92295e0f744f088f473ac047538c3",
  *          "md5_checksum": null,
  *          "privacy": false,
  *          "state": "finished",
  *          "test": false,
  *          "updated_at": "2016-11-06T20:42:55.980Z",
  *          "video_bitrate_in_kbps": null,
  *          "video_codec": null,
  *          "width": null,
  *          "total_bitrate_in_kbps": null,
  *          "url": null
  *        },
  *        "stream": {
  *          "created_at": null,
  *          "finished_at": "2016-11-06T20:43:16.063Z",
  *          "height": null,
  *          "id": "stream-edb92295e0f744f088f473ac047538c3",
  *          "name": "alive",
  *          "protocol": null,
  *          "state": null,
  *          "test": false,
  *          "updated_at": null,
  *          "width": null,
  *          "total_bitrate_in_kbps": null,
  *          "duration": 1478464996.063,
  *          "region": "my-region-list,
  *          "url": "rtmp://ep4-usw2.bcovlive.io:1935/edb92295e0f744f088f473ac047538c3",
  *          "location": {
  *            "source": {
  *              "latitude": null,
  *              "longitude": null,
  *              "location": null
  *            },
  *            "destination": {
  *              "latitude": null,
  *              "longitude": null,
  *              "location": null
  *            },
  *            "distance": null
  *          },
  *          "in_worker_bytes": 0,
  *          "in_worker_bytes_rate": 0
  *        },
  *        "output_media_files": [
  *          {
  *            "audio_bitrate_in_kbps": 196.608,
  *            "audio_codec": "AAC",
  *            "audio_sample_rate": null,
  *            "channels": null,
  *            "created_at": "2016-11-06T20:12:46.571Z",
  *            "duration_in_ms": 1478464996063,
  *            "error_class": null,
  *            "error_message": null,
  *            "file_size_bytes": null,
  *            "finished_at": "2016-11-06T20:43:16.063Z",
  *            "format": null,
  *            "fragment_duration_in_ms": null,
  *            "frame_rate": null,
  *            "height": 540,
  *            "id": "0-edb92295e0f744f088f473ac047538c3",
  *            "md5_checksum": null,
  *            "privacy": false,
  *            "rfc_6381_audio_codec": null,
  *            "rfc_6381_video_codec": null,
  *            "state": "finished",
  *            "test": false,
  *            "updated_at": "2016-11-06T20:42:55.980Z",
  *            "video_bitrate_in_kbps": 1887.232,
  *            "video_codec": "H.264",
  *            "video_codec_profile": "main",
  *            "width": 960,
  *            "label": "hls720p",
  *            "total_bitrate_in_kbps": 2083.84,
  *            "keyframe_interval": 60,
  *            "keyframe_interval_follow_source": false,
  *            "segment_seconds": 6,
  *            "live_stream": true,
  *            "playback_url": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/profile_0/chunklist.m3u8",
  *            "playback_url_dvr": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/profile_0/chunklist_dvr.m3u8",
  *            "playback_url_vod": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/profile_0/chunklist_vod.m3u8"
  *          },
  *          {
  *            "audio_bitrate_in_kbps": 196.608,
  *            "audio_codec": "AAC",
  *            "audio_sample_rate": null,
  *            "channels": null,
  *            "created_at": "2016-11-06T20:12:46.571Z",
  *            "duration_in_ms": 1478464996063,
  *            "error_class": null,
  *            "error_message": null,
  *            "file_size_bytes": null,
  *            "finished_at": "2016-11-06T20:43:16.063Z",
  *            "format": null,
  *            "fragment_duration_in_ms": null,
  *            "frame_rate": null,
  *            "height": 360,
  *            "id": "1-edb92295e0f744f088f473ac047538c3",
  *            "md5_checksum": null,
  *            "privacy": false,
  *            "rfc_6381_audio_codec": null,
  *            "rfc_6381_video_codec": null,
  *            "state": "finished",
  *            "test": false,
  *            "updated_at": "2016-11-06T20:42:55.980Z",
  *            "video_bitrate_in_kbps": 838.656,
  *            "video_codec": "H.264",
  *            "video_codec_profile": "main",
  *            "width": 640,
  *            "label": "hls480p",
  *            "total_bitrate_in_kbps": 1035.264,
  *            "keyframe_interval": 60,
  *            "keyframe_interval_follow_source": false,
  *            "segment_seconds": 6,
  *            "live_stream": true,
  *            "playback_url": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/profile_1/chunklist.m3u8",
  *            "playback_url_dvr": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/profile_1/chunklist_dvr.m3u8",
  *            "playback_url_vod": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/profile_1/chunklist_vod.m3u8"
  *          },
  *          {
  *            "playlist_type": "defaultS3",
  *            "type": "playlist",
  *            "filename": "playlist.m3u8",
  *            "dvr_filename": "playlist_dvr.m3u8",
  *            "playback_url": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/playlist.m3u8",
  *            "playback_url_dvr": "http://playback.bcovlive.io/edb92295e0f744f088f473ac047538c3/us-west-2/playlist_dvr.m3u8"
  *          }
  *        ]
  *      }
  *    }
  *
  * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 5xx) {json} INTERNAL SERVER ERROR 500: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  *
  *
  */

// Manual Ad Cue Point Insertion

/**
  * @api {post} /v1/jobs/:jobId/cuepoint Manual Ad Cue Point Insertion
  * @apiName Manual Ad Cue Point Insertion
  * @apiGroup Live_Jobs
  * @apiVersion 1.0.0
  *
  * @apiDescription Inserts a manual Cue-Out with a duration to the Live ingest point.
  *
  * @apiHeader {String} Content-Type: application/json
  * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
  *
  * @apiParam (URL Parameters) {String} jobId The job id you want details for.
  * @apiParam (Request Body Fields) {Number} duration An integer value to indicate the length of the ad break in seconds
  * @apiParam (Request Body Fields) {String} [timecode] When to insert the cuepoint in HH:MM:SS:FF from the stream start (FF = frames); if omitted, the cuepoint will be inserted immediately
  * @apiParam (Request Body Fields) {Object} [ad_server_data] a set of any variables (key/value pairs) that should be passed to the adServer
  *
  * @apiParamExample {json} Live Stream Cuepoint Insertion Request Body Example:
  *    {
  *       "duration": 30,
  *       "ad_server_data" : {
  *            "varToAdServer": "Hello",
  *            "adBreakId": 12312
  *            "adBreakCategory": "summer"
  *       }
  *    }
  *
  * @apiSuccess (Response Fields) {String} id The id of the live stream job
  * @apiSuccess (Response Fields) {Object} cue_point The cuepoint data
  * @apiSuccess (Response Fields) {String} cue_point.id The cuepoint id
  * @apiSuccess (Response Fields) {Number} cue_point.duration The cuepoint duration in seconds
  * @apiSuccess (Response Fields) {String} cue_point.accuracy The cuepoint insertion accuracy - may be `segment` or `frame`
  * @apiSuccess (Response Fields) {DateTimeString} cue_point.inserted_at Time when the cue point was inserted in the stream
  *
  * @apiSuccessExample {json} Success response for ID3 timed metadata Insertion
  *    {
  *        "id": "JOB_ID",
  *        "cue_point": {
  *            "id": "adBreak-2f58393ada1442d98eca0817fa565ba4",
  *            "duration": 30,
  *            "accuracy": "segment", [ Can be segment or frame ]
  *            "inserted_at": "2017-07-21T09:30:46.307Z" [ Time when the cue point was inserted in the stream ]
  *        },
  *    }
  *
  * @apiError (Error 4xx) {json} BAD REQUEST 400: Invalid input value - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 4xx) {json} BAD REQUEST 400: The notification target type is not supported currently - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 5xx) {json} INTERNAL SERVER ERROR 500: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  *
  */

  // Insert ID3 timed metadata

  /**
    * @api {post} /v1/jobs/:jobId/id3tag Insert ID3 timed metadata
    * @apiName Insert ID3 timed metadata
    * @apiGroup Live_Jobs
    * @apiVersion 1.0.0
    *
    * @apiDescription Inserts an ID3 timed metadata tag for an ongoing job.
    *
    * @apiHeader {String} Content-Type: application/json
    * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
    *
    * @apiParam (URL Parameters) {String} jobId The job id you want details for.
    * @apiParam (Request Body Fields) {Object} id3_tag An object containing variables for the ID3 timed metadata
    * @apiParam (Request Body Fields) {String{1..4}} id3_tag.name A name for the tag
    * @apiParam (Request Body Fields) {String} id3_tag.value A value for the tag (maximum string data size 256KB)
    * @apiParam (Request Body Fields) {String} [id3_tag.timecode] Time to insert - by default, insertion is immediate
    *
    * @apiParamExample {json} ID3 timed metadata Insertion Request Body Example:
    *    {
    *        "id3_tag": {
    *            "name": "BCOV",
    *            "value": "my value", []
    *            "timecode": "15:50:49:16" []
    *        }
    *    }
    *
    * @apiSuccess (Response Fields) {String} id The job id
    * @apiSuccess (Response Fields) {Object} id3_tag The ID3 tag details
    * @apiSuccess (Response Fields) {String} id3_tag.tag_name The ID3 tag name
    * @apiSuccess (Response Fields) {String} id3_tag.tag_value The ID3 tag value
    *
    * @apiSuccessExample {json} Success response for ID3 timed metadata Insertion
    *    {
    *      "id": "JOB_ID",
    *      "id3_tag": {
    *        "tag_name": "BCOV",
    *        "tag_value": "my value"
    *      }
    *    }
    *
    * @apiError (Error 4xx) {json} BAD REQUEST 400: Invalid input value - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
    * @apiError (Error 4xx) {json} BAD REQUEST 400: The notification target type is not supported currently - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
    * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
    * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
    * @apiError (Error 5xx) {json} INTERNAL SERVER ERROR 500: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
    *
    */
