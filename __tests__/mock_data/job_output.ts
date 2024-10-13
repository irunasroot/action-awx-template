const JOB_OUTPUT_DATA_ANSI = `
PLAY [Hello World Sample] ******************************************************

TASK [Gathering Facts] *********************************************************
[0;32mok: [localhost][0m

TASK [Hello Message] ***********************************************************
[0;32mok: [localhost] => {[0m
[0;32m    "msg": "Hello World!"[0m
[0;32m}[0m

PLAY RECAP *********************************************************************
[0;32mlocalhost[0m                  : [0;32mok=2   [0m changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   `

const JOB_OUTPUT_DATA_TXT = `
PLAY [Hello World Sample] ******************************************************

TASK [Gathering Facts] *********************************************************
ok: [localhost]

TASK [Hello Message] ***********************************************************
ok: [localhost] => {
    "msg": "Hello World!"
}

PLAY RECAP *********************************************************************
localhost                  : ok=2    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   `

const JOB_OUTPUT_DATA_JSON = {
  range: {
    start: 0,
    end: 13,
    absolute_end: 13
  },
  content:
    '\nPLAY [Hello World Sample] ******************************************************\n\nTASK [Gathering Facts] *********************************************************\n\u001b[0;32mok: [localhost]\u001b[0m\n\nTASK [Hello Message] ***********************************************************\n\u001b[0;32mok: [localhost] => {\u001b[0m\n\u001b[0;32m    "msg": "Hello World!"\u001b[0m\n\u001b[0;32m}\u001b[0m\n\nPLAY RECAP *********************************************************************\n\u001b[0;32mlocalhost\u001b[0m                  : \u001b[0;32mok=2   \u001b[0m changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   \n'
}

export { JOB_OUTPUT_DATA_ANSI, JOB_OUTPUT_DATA_TXT, JOB_OUTPUT_DATA_JSON }
