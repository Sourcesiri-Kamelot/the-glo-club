#!/usr/bin/env node

/**
 * Glo Club - Automated Functionality Test Runner
 * Tests all major functionality and reports results
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Glo Club - Automated Functionality Testing\n');

const testResults = {
  passed: 0,
  failed: 0,
  issues: []
};

// Test categories
const tests = [
  {
    name: 'Build System',
    tests: [
      () => testBuild(),
      () => testEnvironmentFiles(),
      () => testDependencies()
    ]
  },
  {
    name: 'File Structure',
    tests: [
      () => testPageFiles(),
      () => testComponentFiles(),
      () => testAPIRoutes()
    ]
  },
  {
    name: 'Configuration',
    tests: [
      () => testNextConfig(),
      () => testTailwindConfig(),
      () => testTypeScript()
    ]
  }
];

// Test functions
function testBuild() {
  try {
    console.log('  ⏳ Testing build system...');
    execSync('npm run build', { stdio: 'pipe', cwd: process.cwd() });
    console.log('  ✅ Build system works');
    testResults.passed++;
    return true;
  } catch (error) {
    console.log('  ❌ Build failed:', error.message);
    testResults.failed++;
    testResults.issues.push('Build system failed');
    return false;
  }
}

function testEnvironmentFiles() {
  const envFile = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envFile)) {
    console.log('  ✅ Environment file exists');
    testResults.passed++;
    return true;
  } else {
    console.log('  ❌ .env.local file missing');
    testResults.failed++;
    testResults.issues.push('.env.local file missing');
    return false;
  }
}

function testDependencies() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredDeps = [
      'next', 'react', 'typescript', 'tailwindcss', 
      'next-auth', '@prisma/client', 'react-hook-form',
      'nodemailer'
    ];
    
    const missing = requiredDeps.filter(dep => 
      !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]
    );
    
    if (missing.length === 0) {
      console.log('  ✅ All required dependencies present');
      testResults.passed++;
      return true;
    } else {
      console.log('  ❌ Missing dependencies:', missing.join(', '));
      testResults.failed++;
      testResults.issues.push(`Missing dependencies: ${missing.join(', ')}`);
      return false;
    }
  } catch (error) {
    console.log('  ❌ Could not read package.json');
    testResults.failed++;
    testResults.issues.push('Could not read package.json');
    return false;
  }
}

function testPageFiles() {
  const requiredPages = [
    'src/app/page.tsx',
    'src/app/login/page.tsx',
    'src/app/signup/page.tsx',
    'src/app/dashboard/page.tsx',
    'src/app/events/page.tsx',
    'src/app/community/page.tsx',
    'src/app/members/page.tsx',
    'src/app/resources/page.tsx',
    'src/app/booking/page.tsx',
    'src/app/profile/page.tsx',
    'src/app/spotlight/page.tsx',
    'src/app/contact/page.tsx'
  ];
  
  const missing = requiredPages.filter(page => !fs.existsSync(page));
  
  if (missing.length === 0) {
    console.log('  ✅ All required pages exist');
    testResults.passed++;
    return true;
  } else {
    console.log('  ❌ Missing pages:', missing.join(', '));
    testResults.failed++;
    testResults.issues.push(`Missing pages: ${missing.join(', ')}`);
    return false;
  }
}

function testComponentFiles() {
  const requiredComponents = [
    'src/components/navigation.tsx',
    'src/components/chat-widget.tsx',
    'src/components/auth-wrapper.tsx',
    'src/components/ui/button.tsx',
    'src/components/ui/card.tsx',
    'src/components/ui/input.tsx'
  ];
  
  const missing = requiredComponents.filter(comp => !fs.existsSync(comp));
  
  if (missing.length === 0) {
    console.log('  ✅ All required components exist');
    testResults.passed++;
    return true;
  } else {
    console.log('  ❌ Missing components:', missing.join(', '));
    testResults.failed++;
    testResults.issues.push(`Missing components: ${missing.join(', ')}`);
    return false;
  }
}

function testAPIRoutes() {
  const requiredRoutes = [
    'src/app/api/chat/route.ts',
    'src/app/api/email/route.ts'
  ];
  
  const missing = requiredRoutes.filter(route => !fs.existsSync(route));
  
  if (missing.length === 0) {
    console.log('  ✅ All required API routes exist');
    testResults.passed++;
    return true;
  } else {
    console.log('  ❌ Missing API routes:', missing.join(', '));
    testResults.failed++;
    testResults.issues.push(`Missing API routes: ${missing.join(', ')}`);
    return false;
  }
}

function testNextConfig() {
  if (fs.existsSync('next.config.js') || fs.existsSync('next.config.mjs')) {
    console.log('  ✅ Next.js config exists');
    testResults.passed++;
    return true;
  } else {
    console.log('  ❌ Next.js config missing');
    testResults.failed++;
    testResults.issues.push('Next.js config missing');
    return false;
  }
}

function testTailwindConfig() {
  if (fs.existsSync('tailwind.config.js') || fs.existsSync('tailwind.config.ts')) {
    console.log('  ✅ Tailwind config exists');
    testResults.passed++;
    return true;
  } else {
    console.log('  ❌ Tailwind config missing');
    testResults.failed++;
    testResults.issues.push('Tailwind config missing');
    return false;
  }
}

function testTypeScript() {
  if (fs.existsSync('tsconfig.json')) {
    console.log('  ✅ TypeScript config exists');
    testResults.passed++;
    return true;
  } else {
    console.log('  ❌ TypeScript config missing');
    testResults.failed++;
    testResults.issues.push('TypeScript config missing');
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('Starting automated tests...\n');
  
  for (const category of tests) {
    console.log(`📋 Testing ${category.name}:`);
    
    for (const test of category.tests) {
      await test();
    }
    
    console.log('');
  }
  
  // Results summary
  console.log('📊 Test Results Summary:');
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📈 Success Rate: ${Math.round((testResults.passed / (testResults.passed + testResults.failed)) * 100)}%`);
  
  if (testResults.issues.length > 0) {
    console.log('\n🚨 Issues Found:');
    testResults.issues.forEach((issue, index) => {
      console.log(`  ${index + 1}. ${issue}`);
    });
  }
  
  if (testResults.failed === 0) {
    console.log('\n🎉 All automated tests passed! Ready for manual testing.');
  } else {
    console.log('\n⚠️  Some tests failed. Please fix issues before deployment.');
  }
  
  console.log('\n📝 Next Steps:');
  console.log('1. Run: npm run dev');
  console.log('2. Open: http://localhost:3000');
  console.log('3. Follow TESTING_CHECKLIST.md for manual testing');
  console.log('4. Test on mobile devices');
  console.log('5. Verify all functionality works');
}

// Run the tests
runTests().catch(console.error);
