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
      user {
        username
        avatar
      }
    }
    createdAt
    totalMember
    isJoining
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

export const FEED_MATCH = gql`
  fragment FeedMatch on Match {

    id
    user {
      id
      username
      avatar
    }
    games {
      club {
        clubname
        emblem
      }
    }
    createdAt
  }

`;
