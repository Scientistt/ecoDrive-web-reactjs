import type { StaticImageData } from "next/image";

import default_black from "assets/images/aws/bucket/bucket_black.png";
import default_blue from "assets/images/aws/bucket/bucket_blue.png";
import default_green from "assets/images/aws/bucket/bucket_green.png";
import default_red from "assets/images/aws/bucket/bucket_red.png";
import default_white from "assets/images/aws/bucket/bucket_white.png";
import default_yellow from "assets/images/aws/bucket/bucket_yellow.png";

export const bucketIcons: Record<string, StaticImageData> = {
    default_black: default_black,
    default_blue: default_blue,
    default_green: default_green,
    default_red: default_red,
    default_white: default_white,
    default_yellow: default_yellow,

    default: default_black
};

import aws_logo_light from "assets/images/aws/identity/aws_light.svg";
import aws_logo_dark from "assets/images/aws/identity/aws_dark.svg";

export const aws: Record<string, StaticImageData> = {
    logo_light: aws_logo_light,
    logo_dark: aws_logo_dark
};
