http://www.sno.phy.queensu.ca/~phil/exiftool/

EXIFTOOL - Visual Basic 6.0-Script for reading AND writing TAGS with the help of exiftool:
------------------------------------------------------------------------------------------

With this small vb-module you can read ALL available TAGS from EXIF information retrieved by exiftool. Therefore you only need to have the exiftool.exe in the same directory as the vb-program.

Example of usage:

	call EXIFLoad("c:\images\test.jpg")
	if exifloaded then
		msgbox(Get_EXIFTag("Camera Body No."))
	end if
	
So by simply loading your test.jpg you then have access to ALL available tags which can be retrieved by exiftool. Please write tag names exactly as they are mentioned by exiftool.

For questions on that code feel free to contact me at: michaelwandel (at) gmx (dot) de.

-------------------- CODE BEGINS HERE -------------------------------------------------

Attribute VB_Name = "modEXIFTool"
Private exifFile As String
Private exifTool As String
Public exifLoaded As Boolean
Private exifStructure() As Variant

' Version 1.01
' Written by Michael Wandel (c) 2009
' Contact: michaelwandel (at) gmx (dot) de
'
' 11.09.2008:
' - initiale release
'
' 29.01.2009:
' - added Function Put_EXIFTag by request of Eric

Private Declare Function CreatePipe Lib "kernel32" (phReadPipe As Long, phWritePipe As Long, lpPipeAttributes As Any, ByVal nSize As Long) As Long
Public Declare Function ReadFile Lib "kernel32" (ByVal hFile As Long, ByVal lpBuffer As String, ByVal nNumberOfBytesToRead As Long, lpNumberOfBytesRead As Long, ByVal lpOverlapped As Any) As Long
Private Declare Function CreateProcessA Lib "kernel32" (ByVal lpApplicationName As Long, ByVal lpCommandLine As String, lpProcessAttributes As SECURITY_ATTRIBUTES, lpThreadAttributes As SECURITY_ATTRIBUTES, ByVal bInheritHandles As Long, ByVal dwCreationFlags As Long, ByVal lpEnvironment As Long, ByVal lpCurrentDirectory As Long, lpStartupInfo As STARTUPINFO, lpProcessInformation As PROCESS_INFORMATION) As Long
Public Declare Function CloseHandle Lib "kernel32" (ByVal hHandle As Long) As Long
Private Type SECURITY_ATTRIBUTES
        nLength As Long
        lpSecurityDescriptor As Long
        bInheritHandle As Long
End Type
Private Type STARTUPINFO
        cb As Long
        lpReserved As Long
        lpDesktop As Long
        lpTitle As Long
        dwX As Long
        dwY As Long
        dwXSize As Long
        dwYSize As Long
        dwXCountChars As Long
        dwYCountChars As Long
        dwFillAttribute As Long
        dwFlags As Long
        wShowWindow As Integer
        cbReserved2 As Integer
        lpReserved2 As Long
        hStdInput As Long
        hStdOutput As Long
        hStdError As Long
End Type
Private Type PROCESS_INFORMATION
        hProcess As Long
        hThread As Long
        dwProcessId As Long
        dwThreadId As Long
End Type
Public hWritePipe As Long
Public hReadPipe As Long
Public proc As PROCESS_INFORMATION

Private Function ExecuteCommand(mCommand As String)
        Dim start As STARTUPINFO
        Dim sa As SECURITY_ATTRIBUTES
        If Len(mCommand) = 0 Then Exit Function

        sa.nLength = Len(sa)
        sa.bInheritHandle = 1&
        sa.lpSecurityDescriptor = 0&

        If CreatePipe(hReadPipe, hWritePipe, sa, 0) = 0 Then Exit Function
        start.cb = Len(start)
        start.dwFlags = &H100& Or &H1
        start.hStdOutput = hWritePipe
        start.hStdError = hWritePipe
        If CreateProcessA(0&, mCommand, sa, sa, 1&, &H20&, 0&, 0&, start, proc) <> 1 Then Exit Function

        CloseHandle (hWritePipe)
End Function

Public Function EXIFLoad(ByVal exifFilename As String)

        Dim inText As String
        Dim inArray() As String

        exifTool = AppPath() & "\exiftool.exe"
        If Not FileExist(exifTool) Then
                MsgBox exifTool & " not found!"
                exifFile = ""
                exifLoaded = False
        Else
                If FileExist(exifFilename) Then
                        Dim exifLen As Integer
                        ReDim exifStructure(1 To 500, 1 To 2)
                        exifLen = 1

                        exifFile = exifFilename
                        inText = ""
                        ExecuteCommand (exifTool & " -s " & Chr(34) & exifFile & Chr(34))
                        Dim lngBytesread As Long
                        Dim strBuff As String * 2048

                        While ReadFile(hReadPipe, strBuff, 2048, lngBytesread, 0&) <> 0
                                inText = inText & Left(strBuff, lngBytesread)
                                DoEvents
                        Wend
                        CloseHandle (proc.hProcess)
                        CloseHandle (proc.hThread)
                        CloseHandle (hReadPipe)

                        If Trim(inText) <> "" Then
                                inArray = Split(inText, vbCrLf)
                                For I = 0 To UBound(inArray) - 1
                                        exifStructure(exifLen, 1) = Trim(Left(inArray(I), InStr(inArray(I), ":") - 1))
                                        exifStructure(exifLen, 2) = Trim(Mid(inArray(I), InStr(inArray(I), ":") + 1, Len(inArray(I))))
                                        exifLen = exifLen + 1
                                Next
                                exifLoaded = True
                        Else
                                exifFile = ""
                                exifLoaded = False
                        End If
                Else
                        exifFile = ""
                        exifLoaded = False
                End If
        End If
End Function

Public Function Get_EXIFTag(ByVal EXIFTag As String) As String
        Dim DirNo
        Get_EXIFTag = ""
        If exifLoaded Then
                For DirNo = 1 To UBound(exifStructure)
                        If exifStructure(DirNo, 1) = EXIFTag Then
                                Get_EXIFTag = exifStructure(DirNo, 2)
                                Exit For
                        End If
                Next
        End If
End Function

Public Function Get_EXIFInfo() As String
        Dim DirNo
        Get_EXIFInfo = ""
        If exifLoaded Then
                For DirNo = 1 To UBound(exifStructure)
                        Get_EXIFInfo = Get_EXIFInfo & exifStructure(DirNo, 1) & vbTab & exifStructure(DirNo, 2) & vbCrLf
                Next
        End If
End Function

Public Function Put_EXIFTag(ByVal EXIFTag As String, ByVal newValue As String) As Boolean
        ' To be sure that exifFile and other vars are set ;-)
        If exifLoaded Then
                Dim idProg  As Long
                idProg = Shell(exifTool & " -" & EXIFTag & "=" & Chr(34) & newValue & Chr(34) & " " & Chr(34) & exifFile & Chr(34))
                ' to be sure that process has ended...
                iExit = StillRunning(idProg)
                ' then reload the whole bunch
                EXIFLoad (exifFile)
                ' ok, i admit, somewhat dirty ;-)
                Put_EXIFTag = True
        Else
                Put_EXIFTag = False
        End If
End Function

-------------------- CODE ENDS HERE --------------------------------------------------------