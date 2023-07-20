import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import images from '../../Images';
import { commonStyle as cs } from '../../styles';

import { menuButtonsStyle as mbs, subMenuButtonsStyle as smbs } from './styles';

export const MenuButtons = props => {
  const {
    onPress,
    onExpand,
    icon,
    title,
    extraImage,
    accessible,
    accessibilityLabel,
    extraImageLabel,
  } = props;
  return (
    <TouchableOpacity
      style={mbs.container}
      onPress={onPress}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      <View style={mbs.innerContainer}>
        <Image source={icon} />
      </View>
      <View
        style={[
          mbs.contentContainer,
          {
            flex: !extraImage ? 8 : 6,
          },
        ]}
      >
        <Text style={mbs.titleText}>{title}</Text>
      </View>
      {!extraImage ? null : (
        <TouchableOpacity
          style={[
            mbs.imageContainer,
            {
              padding: 7.5
            },
          ]}
          extraImage={extraImageLabel}
          onPress={onExpand}
        >
          <Image source={extraImage} style={cs.expandIconAlt} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export const SubMenuButtons = props => {
  const {
    onPress,
    icon,
    iconStyle,
    title,
    accessible,
    accessibilityLabel
  } = props;
  return (
    <TouchableOpacity
      style={smbs.container}
      onPress={onPress}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      <View style={smbs.innerContainer}>
        <Image source={icon} style={iconStyle} />
      </View>
      <View style={smbs.contentContainer}>
        <Text style={smbs.titleText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const PostActions = props => {
  const { onResponse, onRequest } = props;
  return (
    <View style={cs.postBottomTop}>
      <TouchableOpacity onPress={onResponse} style={cs.postActionButton}>
        <Image style={cs.replyIcon} source={images.reply} />
        <Text style={cs.postInfoText}>No Responses</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          cs.postActionButton,
          { justifyContent: 'flex-end', paddingRight: 5 },
        ]}
      >
        <Image style={cs.likeIcon} source={images.like} />
        <Text style={cs.postInfoText}>4 Likes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={cs.postActionButton}>
        <Image
          style={{
            width: 15.9,
            height: 17.6,
            marginRight: 7.5
          }}
          source={images.share}
        />
        <Text style={cs.postInfoText}>2 Shares</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRequest} style={cs.postActionButton}>
        <Image
          style={{
            width: 15.9,
            height: 17.6,
            marginRight: 5
          }}
          source={images.closeIcon}
        />
        <Text style={cs.postInfoText}>Close Request</Text>
      </TouchableOpacity>
    </View>
  );
};

export const BottomButtons = props => {
  const { onReply } = props;
  return (
    <View style={cs.postBottomBottom}>
      <TouchableOpacity onPress={onReply} style={cs.postReplyInput}>
        <Image style={cs.replyIcon} source={images.reply} />
        <Text style={cs.placeholderStyle}>Write a Reply</Text>
      </TouchableOpacity>
      <TouchableOpacity style={cs.actionButtons}>
        <Image style={cs.likeIconAlt} source={images.like} />
        <Text style={cs.postInfoTextAlt}>Like</Text>
      </TouchableOpacity>
      <TouchableOpacity style={cs.actionButtons}>
        <Image
          style={{
            width: 18,
            height: 19.9,
            marginRight: 7.5
          }}
          source={images.share}
        />
        <Text style={cs.postInfoTextAlt}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};
