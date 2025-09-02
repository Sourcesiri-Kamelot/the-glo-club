import { User, Post, Comment, Like, Event, EventRSVP, StudioBooking, Resource, Magazine } from '@prisma/client'

// Extended types with relations
export type PostWithAuthor = Post & {
  author: User
  comments: Comment[]
  likes: Like[]
  _count: {
    comments: number
    likes: number
  }
}

export type CommentWithAuthor = Comment & {
  author: User
}

export type EventWithRSVPs = Event & {
  rsvps: EventRSVP[]
  _count: {
    rsvps: number
  }
}

export type UserWithStats = User & {
  _count: {
    posts: number
    studioBookings: number
  }
}

export type StudioBookingWithUser = StudioBooking & {
  user: User
}

// Form types
export type CreatePostData = {
  content: string
  imageUrl?: string
  videoUrl?: string
}

export type CreateCommentData = {
  content: string
  postId: string
}

export type CreateEventRSVPData = {
  eventId: string
  status: 'CONFIRMED' | 'DECLINED'
}

export type CreateStudioBookingData = {
  date: Date
  startTime: Date
  endTime: Date
  duration: number
  purpose?: string
}
