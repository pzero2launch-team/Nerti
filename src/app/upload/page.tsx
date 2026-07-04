'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  Shield,
  FileCode
} from 'lucide-react'
import clsx from 'clsx'
import {
  Card,
  Button,
  SectionHeader
} from '@/components/ui'

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'success'>('idle')

  const handleFile = (f: File) => {
    if (f.type === 'application/pdf' || f.name.endsWith('.csv')) {
      setFile(f)
      setStatus('idle')
    } else {
      alert('Please upload a PDF or CSV bank statement.')
    }
  }

  const startUpload = () => {
    setStatus('uploading')
    setTimeout(() => {
      setStatus('processing')
      setTimeout(() => {
        setStatus('success')
      }, 2000)
    }, 1500)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Upload Statement</h1>
        <p className="text-sm text-muted mt-1">Import your bank transactions to detect recurring payments automatically.</p>
      </div>

      {status === 'success' ? (
        <Card className="py-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-xl font-semibold text-primary mb-2">Analysis Complete</h2>
          <p className="text-sm text-secondary max-w-xs mx-auto mb-8">
            We've successfully analyzed your statement. 14 new recurring payments and 2 insurance policies were detected.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => { setFile(null); setStatus('idle') }}>
              Upload another
            </Button>
            <Button onClick={() => window.location.href = '/dashboard'}>
              View Dashboard <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card
              className={clsx(
                'border-2 border-dashed transition-all py-16 flex flex-col items-center justify-center text-center cursor-pointer',
                isDragging ? 'border-purple-500 bg-purple-500/5' : 'border-default hover:border-purple-500/40',
                file && 'border-purple-500/40'
              )}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setIsDragging(false)
                const f = e.dataTransfer.files[0]
                if (f) handleFile(f)
              }}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                className="hidden"
                accept=".pdf,.csv"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) handleFile(f)
                }}
              />

              {file ? (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-400 mb-4">
                    {file.name.endsWith('.pdf') ? <FileText size={32} /> : <FileCode size={32} />}
                  </div>
                  <div className="text-sm font-medium text-primary mb-1">{file.name}</div>
                  <div className="text-xs text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-muted mb-4">
                    <Upload size={32} />
                  </div>
                  <div className="text-sm font-medium text-primary mb-1">Click to upload or drag and drop</div>
                  <div className="text-xs text-muted">Bank statement in PDF or CSV format</div>
                </div>
              )}
            </Card>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-muted">
                <Shield size={14} className="text-emerald-400" />
                Data is encrypted and processed locally.
              </div>
              <Button
                disabled={!file || status !== 'idle'}
                loading={status !== 'idle'}
                onClick={startUpload}
                className="px-8"
              >
                {status === 'idle' ? 'Process Statement' : status === 'uploading' ? 'Uploading...' : 'Analyzing...'}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Card>
              <SectionHeader title="How it works" />
              <div className="space-y-4 mt-4">
                {[
                  { step: '01', title: 'Upload', desc: 'Securely upload your bank statement.' },
                  { step: '02', title: 'Analyze', desc: 'Our AI detects recurring patterns.' },
                  { step: '03', title: 'Review', desc: 'Verify and add to your dashboard.' },
                ].map((s) => (
                  <div key={s.step} className="flex gap-3">
                    <div className="text-xs font-bold text-purple-400 mt-0.5">{s.step}</div>
                    <div>
                      <div className="text-xs font-semibold text-primary">{s.title}</div>
                      <div className="text-[11px] text-muted mt-0.5">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-purple-900/10 border-purple-800/20">
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-purple-400 flex-shrink-0" />
                <p className="text-xs text-secondary leading-relaxed">
                  For the best results, use a standard monthly statement from a major bank. Ensure the document is not password protected.
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
