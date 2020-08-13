import React from 'react';
import { MonacoDiffEditor } from 'react-monaco-editor';
import { Dialog,Select,Switch,Input } from 'element-react';

import 'element-theme-default';
import '../common.css'

const code_origin = "// your original code...";
const code_modify = "// a different version...";
const curLanguage = 'java';
const dialogVisible = false;
const renderSideBySide = true;

export class AdvancedTypescriptEditor extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            code_origin,
            code_modify,
            curLanguage,
            dialogVisible,
            renderSideBySide
        }

        this.reloadLocalStorage();
    }

    render() {

        const languages = ['java','typescript','python','sql','xml','yaml','shell','html','css','go','markdown'];
        const options = {
            renderSideBySide: this.state.renderSideBySide
        };

        return (
            <div>
                <div className="d-flex justify-content-around"> 
                    <div style={{ width: '460px' }}></div>
                    <span className="title pointer" onClick={ () => this.setState({ dialogVisible: true }) }>
                        Monaco-Diff
                        <i className="el-icon-setting" style={{ marginLeft: '10px'}}></i>
                    </span>
                    <div className="d-flex">
                        <div style={{ margin: '4px'}} >
                            language：
                            <Select value={this.state.curLanguage} size="small" onChange={ this.handleLanguageChange }>
                                {
                                    languages.map(el => {
                                        return <Select.Option key={el} label={el} value={el} />
                                    })
                                }
                            </Select>
                        </div>
                        <div style={{ margin: '4px' }} >
                            Side-By-Side：
                            <Switch
                                value={this.state.renderSideBySide}
                                size="small"
                                onColor="#13ce66"
                                offColor="#ff4949"
                                onChange={ this.handleRenderSideBySideChange }
                            >
                            </Switch>
                        </div>
                    </div>
                </div>
                <div className="momacoClass">
                    <MonacoDiffEditor
                        language={this.state.curLanguage}
                        original={this.state.code_origin}
                        value={this.state.code_modify}
                        options={options}
                    />
                </div>
                <Dialog
                    title="Monaco Diff Config"
                    size="large"
                    visible={ this.state.dialogVisible }
                    onCancel={ () => this.setState({ dialogVisible: false }) }
                >
                    <Dialog.Body>
                        <div className="d-flex">
                            <div className="flex-1" style={{ margin:'4px' }}>
                                <div>原始数据</div>
                                <Input
                                    value={ this.state.code_origin }
                                    type="textarea"
                                    onChange={ this.handleCodeOriginChange }
                                    autosize={{ minRows: 20, maxRows: 30}}
                                    placeholder="请输入原始数据"
                                />
                            </div>
                            <div className="flex-1" style={{ margin:'4px' }}>
                                <div>比对数据</div>
                                <Input
                                    value={ this.state.code_modify }
                                    type="textarea"
                                    onChange={ this.handleCodeModifyChange }
                                    autosize={{ minRows: 20, maxRows: 30}}
                                    placeholder="请输入比对数据"
                                />
                            </div>
                        </div>
                    </Dialog.Body>
                </Dialog>
            </div>
        )
    }

    handleCodeOriginChange = e => {
        this.setState({
            code_origin: e
        });
        window.localStorage.setItem('monaco-editor-code_origin-value',e);
    }

    handleCodeModifyChange = e => {
        this.setState({
            code_modify: e
        });
        window.localStorage.setItem('monaco-editor-code_modify-value',e);
    }

    handleLanguageChange = e => {
        this.setState({
            curLanguage: e
        });
        window.localStorage.setItem('monaco-editor-language-value',e);
    };

    handleRenderSideBySideChange = e => {
        this.setState({
            renderSideBySide: e
        });
        window.localStorage.setItem('monaco-editor-renderSideBySide-value',e);
    }
    
    reloadLocalStorage(){
        const langData = window.localStorage.getItem('monaco-editor-language-value');
        const rendData = window.localStorage.getItem('monaco-editor-renderSideBySide-value');
        const code_origin = window.localStorage.getItem('monaco-editor-code_origin-value');
        const code_modify = window.localStorage.getItem('monaco-editor-code_modify-value');

        setTimeout(() => {
            this.setState({
                renderSideBySide: rendData,
                curLanguage: langData ? langData : 'java',
                code_origin:code_origin,
                code_modify:code_modify
            })
        }, 50);;
    }
}