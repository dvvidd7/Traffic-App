import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { forwardRef } from 'react';
import React from 'react';
import { Feather } from '@expo/vector-icons';

type ButtonProps = {
  text: string;
  icon: "link" | "search" | "image" | "menu" | "radio" | "minus" | "plus" | "info" | "check" | "book" | "pause" | "frown" | "mail" | "home" | "star" | "filter" | "meh" | "save" | "user" | "phone" | "paperclip" | "inbox" | "lock" | "cloud" | "eye" | "camera" | "delete" | "heart" | "chrome" | "github" | "upload" | "download" | "unlock" | "play" | "tag" | "calendar" | "database" | "key" | "flag" | "layout" | "printer" | "tool" | "gift" | "wifi" | "edit" | "codepen" | "gitlab" | "youtube" | "twitter" | "dribbble" | "instagram" | "slack" | "align-left" | "align-right" | "archive" | "arrow-down" | "arrow-left" | "arrow-right" | "arrow-up" | "battery" | "bell" | "bookmark" | "box" | "briefcase" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "circle" | "clipboard" | "clock" | "code" | "compass" | "copy" | "credit-card" | "crop" | "facebook" | "feather" | "folder" | "globe" | "grid" | "layers" | "linkedin" | "list" | "log-out" | "map" | "mic" | "moon" | "mouse-pointer" | "music" | "pie-chart" | "rss" | "scissors" | "share" | "shield" | "shopping-bag" | "shopping-cart" | "shuffle" | "tablet" | "thermometer" | "thumbs-down" | "thumbs-up" | "trash" | "tv" | "users" | "video" | "voicemail" | "external-link" | "activity" | "airplay" | "alert-circle" | "alert-octagon" | "alert-triangle" | "align-center" | "align-justify" | "anchor" | "aperture" | "arrow-down-circle" | "arrow-down-left" | "arrow-down-right" | "arrow-left-circle" | "arrow-right-circle" | "arrow-up-circle" | "arrow-up-left" | "arrow-up-right" | "at-sign" | "award" | "bar-chart" | "bar-chart-2" | "battery-charging" | "bell-off" | "bluetooth" | "bold" | "book-open" | "camera-off" | "cast" | "check-circle" | "check-square" | "chevrons-down" | "chevrons-left" | "chevrons-right" | "chevrons-up" | "cloud-drizzle" | "cloud-lightning" | "cloud-off" | "cloud-rain" | "cloud-snow" | "codesandbox" | "coffee" | "columns" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "cpu" | "crosshair" | "disc" | "divide" | "divide-circle" | "divide-square" | "dollar-sign" | "download-cloud" | "droplet" | "edit-2" | "edit-3" | "eye-off" | "fast-forward" | "figma" | "file" | "file-minus" | "file-plus" | "file-text" | "film" | "folder-minus" | "folder-plus" | "framer" | "git-branch" | "git-commit" | "git-merge" | "git-pull-request" | "hard-drive" | "hash" | "headphones" | "help-circle" | "hexagon" | "italic" | "life-buoy" | "link-2" | "loader" | "log-in" | "map-pin" | "maximize" | "maximize-2" | "message-circle" | "message-square" | "mic-off" | "minimize" | "minimize-2" | "minus-circle" | "minus-square" | "monitor" | "more-horizontal" | "more-vertical" | "move" | "navigation" | "navigation-2" | "octagon" | "package" | "pause-circle" | "pen-tool" | "percent" | "phone-call" | "phone-forwarded" | "phone-incoming" | "phone-missed" | "phone-off" | "phone-outgoing" | "play-circle" | "plus-circle" | "plus-square" | "pocket" | "power" | "refresh-ccw" | "refresh-cw" | "repeat" | "rewind" | "rotate-ccw" | "rotate-cw" | "send" | "server" | "settings" | "share-2" | "shield-off" | "sidebar" | "skip-back" | "skip-forward" | "slash" | "sliders" | "smartphone" | "smile" | "speaker" | "square" | "stop-circle" | "sun" | "sunrise" | "sunset" | "target" | "terminal" | "toggle-left" | "toggle-right" | "trash-2" | "trello" | "trending-down" | "trending-up" | "triangle" | "truck" | "twitch" | "type" | "umbrella" | "underline" | "upload-cloud" | "user-check" | "user-minus" | "user-plus" | "user-x" | "video-off" | "volume" | "volume-1" | "volume-2" | "volume-x" | "watch" | "wifi-off" | "wind" | "x" | "x-circle" | "x-octagon" | "x-square" | "zap" | "zap-off" | "zoom-in" | "zoom-out";
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const SquareButton = forwardRef<View | null, ButtonProps>(
  ({ text, icon,...pressableProps }, ref) => {
    return (
      <Pressable ref={ref} {...pressableProps} style={styles.container}>
        <Feather style={styles.icon} name={icon} size={50} color={'white'} />
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.themeColorDarker,
    paddingTop: 20,
    padding: 30,
    width: 200,
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 10,
    borderWidth: 3,
  },
  icon:{
    marginBottom: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
  },
});

export default SquareButton;