'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Home, Info, AlertCircle, BookmarkedIcon } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/saved', label: 'Saved Results', icon: BookmarkedIcon },
    { href: '/about', label: 'Methodology', icon: Info },
    { href: '/disclaimer', label: 'Data Disclaimer', icon: AlertCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Title */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition">
          <span className="text-blue-600">What</span>
          <span className="text-foreground">Can</span>
          <span className="text-blue-600">I</span>
          <span className="text-foreground">Study</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href}>
              <Button variant="ghost" size="sm">
                {label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} onClick={() => setIsOpen(false)}>
                  <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {label}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
