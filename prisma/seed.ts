import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      name: 'John Doe',
      bio: 'Podcast creator and content strategist',
      profilePic: null,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'sarah@example.com',
      name: 'Sarah Miller',
      bio: 'Video producer and social media expert',
      profilePic: null,
    },
  })

  // Create sample events
  const event1 = await prisma.event.create({
    data: {
      title: 'Glo Network & Workshop: Podcast Production Mastery',
      description: 'Learn the ins and outs of podcast production from recording to distribution',
      type: 'GLO_NETWORK_WORKSHOP',
      date: new Date('2024-03-15T18:00:00Z'),
      location: 'Glow Optical Studios',
      maxAttendees: 25,
    },
  })

  const event2 = await prisma.event.create({
    data: {
      title: 'Glo Eat and Meet: Building Authentic Connections',
      description: 'Monthly networking dinner with fellow creators',
      type: 'GLO_EAT_AND_MEET',
      date: new Date('2024-03-28T19:00:00Z'),
      location: 'The Garden Restaurant',
      maxAttendees: 15,
    },
  })

  // Create sample posts
  await prisma.post.create({
    data: {
      content: 'Just finished recording my latest podcast episode in the studio! The acoustics are incredible. Thanks to everyone who gave feedback on my previous episodes.',
      authorId: user1.id,
    },
  })

  await prisma.post.create({
    data: {
      content: 'Looking forward to tomorrow\'s Glo Network Workshop! Who else is attending? Would love to connect and discuss content creation strategies.',
      authorId: user2.id,
    },
  })

  // Create sample resources
  await prisma.resource.create({
    data: {
      title: 'Podcast Marketing Template',
      description: 'Complete marketing template for podcast launches',
      type: 'TEMPLATE',
      fileUrl: '/resources/podcast-marketing-template.pdf',
    },
  })

  await prisma.resource.create({
    data: {
      title: 'Content Creation Guide',
      description: 'Comprehensive guide to creating engaging content',
      type: 'GUIDE',
      fileUrl: '/resources/content-creation-guide.pdf',
    },
  })

  // Create sample magazine
  await prisma.magazine.create({
    data: {
      title: 'Glo Opticals Monthly',
      issue: 'March 2024',
      description: 'Tips, secrets, and member spotlights',
      coverUrl: '/magazines/march-2024-cover.jpg',
      pdfUrl: '/magazines/march-2024.pdf',
      publishedAt: new Date('2024-03-01T00:00:00Z'),
    },
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
