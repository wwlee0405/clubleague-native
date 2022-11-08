import { gql } from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;

export const CLUB_FRAGMENT = gql`
  fragment ClubFragment on Club {
    id
    clubname
    clubArea
    emblem
    clubLeader {
      username
      avatar
    }
    clubMember {
      id
      user {
        username
        avatar
      }
    }
    createdAt
    totalMember
    isJoined
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    avatar
    isMe
    isFollowing
  }
`;

export const FEED_PHOTO = gql`
  fragment FeedPhoto on Photo {
    ...PhotoFragment
    user {
      id
      username
      avatar
    }
    caption
    createdAt
    isMine
  }
  ${PHOTO_FRAGMENT}
`;

export const ROOM_FRAGMENT = gql`
  fragment RoomParts on Room {
    id
    unreadTotal
    users {
      avatar
      username
    }
  }
`;

export const GAME_FRAGMENT = gql`
  fragment GameFragment on Game {
    id
    club {
      id
      clubname
      emblem
    }
  }
`;

export const FEED_MATCH = gql`
  fragment FeedMatch on Match {
    id
    user {
      id
      username
      avatar
    }
    games {
      ...GameFragment
      match {
        id
      }
    }
    createdAt
  }
  ${GAME_FRAGMENT}
`;
