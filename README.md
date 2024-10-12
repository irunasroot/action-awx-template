# Create a GitHub Action Using TypeScript

[![GitHub Super-Linter](https://github.com/irunasroot/action-awx-template/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/irunasroot/action-awx-template/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/irunasroot/action-awx-template/actions/workflows/check-dist.yml/badge.svg)](https://github.com/irunasroot/action-awx-template/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/irunasroot/action-awx-template/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/irunasroot/action-awx-template/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

Action for launching an AWX/AAP Job Template or Workflow Job template. This
action is designed to engage fully with the AWX API for validation and sumitting
the proper variables.

Works with AWX v18 or above, and AAP v2 or above. This _should_ work with older
versions of AWX but not guaranteed as some variables are different in order
versions, i.e. execution environment containers.

## Usage

```yaml
- uses: irunasroot/action-awx-template@v1
  with:
    # The URL of AWX/AAP.
    # If using an insecure SSL certificate be sure to set
    #   controller_verify_certificate to false
    # Variable Context: global
    controller_url: ''

    # The username to log into the controller. One of username/password or
    #   token needs to be provided.
    # Variable Context: global
    controller_username: ''

    # The password to log into the controller. One of username/password or
    #   token needs to be provided.
    # Variable Context: global
    controller_password: ''

    # The token to authenticate to the controller. One of username/password or
    #   token needs to be provided.
    # Variable Context: global
    controller_token: ''

    # The timeout in milliseconds to wait for a call to the controller before
    #   erroring out.
    #   Note this is not a job execution timeout, but rather the timeout of
    #   the actual API calls to the controller
    # Defaults to 1000
    # Variable Context: global
    controller_timeout: ''

    # Verify if the controller's certificate is valid.
    # Defaults to true
    # Variable Context: global
    controller_verify_certificate: ''

    # The job template id to execute. This is mutually exclusive with
    #   workflow_job_template_id
    #   One of job_template_id or workflow_job_template_id has to be
    #   defined in order for the workflow to exeucte
    # Variable Context: Job Template
    job_template_id: ''

    # The job template id to execute. This is mutually exclusive with
    #   workflow_job_template_id
    #   One of job_template_id or workflow_job_template_id has to be defined
    #   in order for the workflow to exeucte
    # Variable Context: Workflow Job Template
    workflow_job_template_id: ''

    # Pass extra command line variables to the playbook. This is the equivalent
    #   of using --extra-vars. The extra_vars variable is evaulated using
    #   JSON.parse so while its a string it needs to be a strifiy'd version of
    #   a JSON object.
    # Variable Context: Job Template, Workflow Job Template
    extra_vars: ''

    # Select the inventory containing the hosts you want this job to manage.
    # Variable Context: Job Template, Workflow Job Template
    inventory: ''

    # Branch to checkout. In addition to branches, you can input tags, commit
    # Variable Context: Job Template, Workflow Job Template
    scm_branch: ''

    # Provide a host pattern to further constrain the list of hosts that will be
    #   managed or affected by the playbook.
    # Variable Context: Job Template, Workflow Job Template
    limit: ''

    # Tags are useful when you have a large playbook, and you want to run a
    #   specific part of a play or task. Use commas to separate multiple tags.
    # Variable Context: Job Template, Workflow Job Template
    job_tags: ''

    # Skip tags are useful when you have a large playbook, and you want to skip
    #   specific parts of a play or task. Use commas to separate multiple tags.
    # Variable Context: Job Template, Workflow Job Template
    skip_tags: ''

    # For job templates, select run to execute the playbook. Select check to
    #   only check playbook syntax, test environment setup, and report
    #   problems without executing the playbook. Can only be one of 'run',
    #   or 'check'
    # Defaults to 'run'
    # Variable Context: Job Template
    job_type: ''

    # Control the level of output ansible will produce as the playbook
    #   executes. Can only be one of 0-5.
    # Variable Context: Job Template
    verbosity: ''

    # If enabled, show the changes made by Ansible tasks, where supported.
    # Variable Context: Job Template
    diff_mode: ''

    # Select credentials for accessing the nodes this job will be ran against.
    #   Specify as a list of ID's seperated by commas.
    # Variable Context: Job Template
    credentials: ''

    # Credentials Passwords. The credential_passwords variable is evaulated
    #   using JSON.parse so while its a string it needs to be a strifiy'd
    #   version of a JSON object.
    # Variable Context: Job Template
    credential_passwords: ''

    # The container image to be used for execution. Specify as the ID
    #   of the EE.
    # Variable Context: Job Template
    execution_environment: ''

    # Optional labels that describe this job template, such as 'dev' or 'test'.
    #   Specify as a list of ID's seperated by commas.
    # Variable Context: Job Template
    labels: ''

    # The number of parallel or simultaneous processes to use while executing
    #   the playbook.
    # Variable Context: Job Template
    forks: ''

    # Divide the work done by this job template into the specified number of
    #   job slices, each running the same tasks against a portion of the
    #   inventory.
    # Variable Context: Job Template
    job_slice_count: ''

    # The amount of time (in seconds) to run before the job is canceled.
    # Variable Context: Job Template
    timeout: ''

    # Select the Instance Groups for this Job Template to run on. Specify as a
    #   list of ID's seperated by commas.
    # Variable Context: Job Template
    instance_groups: ''
```

## Scenarios

### Launch a Job Template

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v4
    with:
      ref: main

  - name: Launch Super Template 10
    uses: irunasroot/action-awx-template@v1
    with:
      controller_url: https://awx.irunasroot.com
      controller_username: ${{ secrets.AWX_USERNAME }}
      controller_password: ${{ secrets.AWX_PASSWORD }}
      job_template_id: 10
      extra_vars: |
      {
        "my_super_var": "my_super_value"
      }
```
