const loadModel = async id => {
  const response = await fetch(`https://expo.dextall.com/api/models/${id}`)

  return await response.json()
}

const getAccessToken = callback =>
  fetch('https://expo.dextall.com/api/forge/token')
    .then(x => x.json())
    .then(x => x.item)
    .then(x => callback(x.access_token, x.expires_in))

export class ForgeViewer {
  constructor(containerId, modelId, type) {
    this.containerId = containerId
    this.modelId = modelId
    this.type = type
    this._handleViewerInit = this._handleViewerInit.bind(this)
    this._onModelLoaded = this._onModelLoaded.bind(this)
  }

  async start() {
    const response = await loadModel(this.modelId)

    if (!response.isSuccess) {
      alert(response.message)

      return
    }

    this.urn =
      this.type === 'source'
        ? response.item.sourceModelUrn
        : response.item.facadeModelUrn

    const options = {
      getAccessToken,
      env: 'AutodeskProduction2',
      api: 'streamingV2',
    }

    Autodesk.Viewing.Initializer(options, this._handleViewerInit)
  }

  _handleViewerInit() {
    this.viewer = new Autodesk.Viewing.GuiViewer3D(
      document.getElementById(this.containerId),
      {
        disabledExtensions: {
          explode: true,
        },
      }
    )
    this.viewer.setTheme('light-theme')
    console.log(this.viewer.start())

    Autodesk.Viewing.Document.load(`urn:${this.urn}`, this._onModelLoaded)
  }

  _onModelLoaded(viewerDocument) {
    const root = viewerDocument.getRoot()

    const model = root.getDefaultGeometry()

    this.viewer.loadDocumentNode(viewerDocument, model)
  }
}

export class AggregatedForgeViewer {
  constructor(containerId, modelId) {
    this.containerId = containerId
    this.modelId = modelId
    this._handleViewerInit = this._handleViewerInit.bind(this)
    this._loadModel = this._loadModel.bind(this)
  }

  async start() {
    const response = await loadModel(this.modelId)

    if (!response.isSuccess) {
      alert(response.message)

      return
    }

    this.sourceModelUrn = response.item.sourceModelUrn
    this.facadeModelUrn = response.item.facadeModelUrn

    const options = {
      getAccessToken,
      env: 'AutodeskProduction2',
      api: 'streamingV2',
    }

    Autodesk.Viewing.Initializer(options, this._handleViewerInit)
  }

  async _handleViewerInit() {
    const nodes = await Promise.all([
      this._loadModel(this.sourceModelUrn),
      this._loadModel(this.facadeModelUrn),
    ])

    const viewer = new Autodesk.Viewing.AggregatedView()

    viewer.init(document.getElementById(this.containerId), {
      viewerConfig: {
        theme: 'light-theme',
      },
      unloadUnfinishedModels: true,
    })

    viewer.setNodes(nodes)
  }

  _loadModel(urn) {
    return new Promise(resolve => {
      Autodesk.Viewing.Document.load(`urn:${urn}`, viewerDocument =>
        resolve(viewerDocument.getRoot().getDefaultGeometry())
      )
    })
  }
}
