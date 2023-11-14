import * as ffm from 'fluent-ffmpeg';

/**
 * A fluent wrapper aroudn the FFMPEG library; it requires ffmpeg be
 * installed on the local machine.
 * 
 * See {@link https://github.com/fluent-ffmpeg/node-fluent-ffmpeg} for details
 */

export const ffmpeg = ffm.default;