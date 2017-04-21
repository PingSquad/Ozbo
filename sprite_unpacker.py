import os
import subprocess
import glob


images_dir = 'assets/images'
sprites_output_dir = 'assets/sprites'


if __name__ == '__main__':
    # assets/images/nyan.gif, ...
    gifs = glob.glob(images_dir + '/*.gif')

    for gif in gifs:
        # nyan.gif
        orig_fn = os.path.split(gif)[-1]
        # nyan
        sprite_dir_name = os.path.splitext(orig_fn)[0]
        # assets/sprites/nyan
        nyan_dir = sprites_output_dir + '/' + sprite_dir_name

        if not os.path.exists(nyan_dir):
            print("Looks like there's a new nyan! Dumping in " + nyan_dir)
            os.mkdir(nyan_dir)

        # assets/sprites/nyan/nyan.png
        cmd_dest = nyan_dir + '/' + sprite_dir_name + '-%03d.png'
        cmd = "convert -coalesce {} {}".format(gif, cmd_dest)
        subprocess.call(cmd.split())
