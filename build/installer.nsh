!ifndef BUILD_UNINSTALLER
  Function AddToStartup
    CreateShortCut "$SMSTARTUP\ocm-agent.lnk" "$INSTDIR\ocm-agent.exe" ""
  FunctionEnd

  ; Using the read me setting as an easy way to add an add to startup option
  !define MUI_FINISHPAGE_SHOWREADME
  !define MUI_FINISHPAGE_SHOWREADME_TEXT "Run at startup"
  !define MUI_FINISHPAGE_SHOWREADME_FUNCTION AddToStartup
!endif
!macro customUnInstall
  Delete "$SMSTARTUP\AppName.lnk"
!macroend
