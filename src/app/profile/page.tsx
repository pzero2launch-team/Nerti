'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Shield,
  Calendar,
  MapPin,
  Camera,
  ExternalLink,
  ChevronRight,
  LogOut
} from 'lucide-react'
import {
  Card,
  Button,
  Badge,
  Divider,
  SectionHeader
} from '@/components/ui'
import { mockUser } from '@/data/mockData'

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Account Profile</h1>
        <Button variant="secondary" size="sm">Edit Profile</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 flex flex-col items-center text-center p-8">
          <div className="relative mb-4 group">
            <div className="w-24 h-24 rounded-full bg-purple-600/20 border-2 border-purple-600/30 flex items-center justify-center text-3xl font-bold text-purple-400">
              {mockUser.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-secondary border border-default flex items-center justify-center text-muted hover:text-primary transition-colors">
              <Camera size={14} />
            </button>
          </div>
          <h2 className="text-lg font-semibold text-primary">{mockUser.name}</h2>
          <p className="text-sm text-muted mt-1">{mockUser.email}</p>
          <Badge variant="info" className="mt-3 uppercase tracking-widest text-[10px]">
            {mockUser.plan} Plan
          </Badge>

          <Divider className="w-full my-6" />

          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 text-sm text-secondary">
              <MapPin size={16} className="text-muted" />
              <span>Lagos, Nigeria</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-secondary">
              <Calendar size={16} className="text-muted" />
              <span>Joined May 2024</span>
            </div>
          </div>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <SectionHeader title="Personal Information" />
            <div className="grid sm:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="text-[10px] font-semibold text-muted uppercase tracking-wider block mb-1">Full Name</label>
                <div className="text-sm text-primary font-medium">{mockUser.name}</div>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-muted uppercase tracking-wider block mb-1">Email Address</label>
                <div className="text-sm text-primary font-medium">{mockUser.email}</div>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-muted uppercase tracking-wider block mb-1">Account Type</label>
                <div className="text-sm text-primary font-medium capitalize">{mockUser.accountType}</div>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-muted uppercase tracking-wider block mb-1">Language</label>
                <div className="text-sm text-primary font-medium">English (US)</div>
              </div>
            </div>
          </Card>

          <Card>
            <SectionHeader title="Security & Authentication" />
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-default hover:bg-card-hover transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted"><Mail size={16} /></div>
                  <div>
                    <div className="text-xs font-semibold text-primary">Change Email</div>
                    <div className="text-[10px] text-muted">Update your account email address</div>
                  </div>
                </div>
                <ChevronRight size={14} className="text-muted" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-default hover:bg-card-hover transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted"><Shield size={16} /></div>
                  <div>
                    <div className="text-xs font-semibold text-primary">Change Password</div>
                    <div className="text-[10px] text-muted">Update your secure password</div>
                  </div>
                </div>
                <ChevronRight size={14} className="text-muted" />
              </div>
            </div>
          </Card>

          <Card className="border-red-500/20 bg-red-500/5">
            <SectionHeader title="Danger Zone" />
            <div className="mt-4 space-y-4">
              <p className="text-xs text-secondary">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="danger" size="sm">Delete Account</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
